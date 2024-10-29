import {
    DecryptedUser,
    UserFromGoogle,
    EncryptedUser,
    UserFieldsToUpdate,
} from '../types/user';
import { encryptText, decryptText } from '../utils/encryption';
import { EncryptedText } from '../types';
import {
    getUserByGoogleId,
    updateUser,
    createUser,
    getUserByUuid,
    updateUserStatus,
    getUser,
} from '../models/user/user.model';
import { USER_STATUS } from '../constants/user';
import { STATUS_CODE } from '../constants/statusCode';
import {
    getStoryWithUser,
    getStoriesWithUserAndHearts,
    countUserStories,
    createStory as createStoryInDatabase,
    getStory,
    updateStoryStatus,
    getStoriesIdByUser,
    updateStoriesToStatusDeleted,
} from '../models/story/story.model';
import { STORY_STATUS, STORY_CATEGORY, MAX_STORIES_NR } from '../constants/story';
import { getStoryImageS3Key, getObjectFromS3, uploadStoryImagesToS3 } from '../utils/services/s3';
import { STORY_IMAGE_FILE_EXTENSION, STORY_IMAGE_MIME_TYPE } from '../constants/image';
import convertBufferToBase64 from '../utils/convertBufferToBase64';
import formatStories from '../utils/formatStories';
import { createDeletedStory, createDeletedStories } from '../models/deletedStory/deletedStory.model';
import { getHeart, createHeart, deleteHeart } from '../models/heart/heart.model';
import { createDeletedUser } from '../models/deletedUser/deletedUser.model';

export default class User {
    private readonly id;

    private readonly uuid;

    private readonly isAdmin;

    constructor(decryptedUser: DecryptedUser) {
        this.id = decryptedUser.id;
        this.uuid = decryptedUser.uuid;
        this.isAdmin = decryptedUser.isAdmin;
    }

    static encryptUserId = (userId: number) => encryptText(
        process.env.USER_ID_ENCRYPTION_KEY!,
        userId.toString(),
    );

    static decryptUserId = (encryptedUserId: EncryptedText) => Number(decryptText(
        process.env.USER_ID_ENCRYPTION_KEY!,
        encryptedUserId
    ));

    static async getOrCreateUser(userFromGoogle: UserFromGoogle) {
        let encryptedUser: EncryptedUser;

        const userFromDatabase = await getUserByGoogleId(userFromGoogle.googleId);

        if (userFromDatabase) {
            if (userFromDatabase.status === USER_STATUS.BANNED) {
                throw new Error('This account is banned.');
            }

            encryptedUser = {
                id: User.encryptUserId(userFromDatabase.id),
                uuid: userFromDatabase.uuid,
            };

            const fieldsToUpdate: UserFieldsToUpdate = {};

            if (userFromDatabase.email !== userFromGoogle.email) {
                fieldsToUpdate.email = userFromGoogle.email;
            }

            if (userFromDatabase.name !== userFromGoogle.name) {
                fieldsToUpdate.name = userFromGoogle.name;
            }

            if (userFromDatabase.photo !== userFromGoogle.photo) {
                fieldsToUpdate.photo = userFromGoogle.photo;
            }

            if (userFromDatabase.status === USER_STATUS.DELETED) {
                fieldsToUpdate.status = USER_STATUS.NORMAL;
            }

            if (Object.keys(fieldsToUpdate).length !== 0) {
                await updateUser(userFromDatabase.id, fieldsToUpdate);
            }
        } else {
            const newUser = await createUser(userFromGoogle);

            encryptedUser = {
                id: User.encryptUserId(newUser.id),
                uuid: newUser.uuid,
            };
        }

        return encryptedUser;
    }

    static async getStoryImage(storyUuid: string, imageNr: string) {
        let statusCode = STATUS_CODE.successful.ok;
        let message = null;
        let image = null;

        const storyWithUser = await getStoryWithUser(storyUuid);

        if (storyWithUser === null) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'The story does not exist in the database.';
        } else if (storyWithUser.status === STORY_STATUS.DELETED) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'The story has been deleted.';
        } else {
            const imageKey = getStoryImageS3Key(
                storyWithUser.user.uuid,
                storyUuid,
                `${imageNr || 1}.${STORY_IMAGE_FILE_EXTENSION}`
            );

            image = await getObjectFromS3(imageKey);

            image = convertBufferToBase64(image.Body as Buffer, STORY_IMAGE_MIME_TYPE);
        }

        return ({ statusCode, message, image });
    }

    async getStories(this: User, myStories: boolean, lastCreatedAt?: string) {
        const statusCode = STATUS_CODE.successful.ok;
        const message = null;

        const stories = await getStoriesWithUserAndHearts(lastCreatedAt, myStories ? this.id : undefined);

        const formattedStories = await formatStories(this.id, this.isAdmin, myStories, stories);

        return ({ statusCode, message, formattedStories });
    }

    async createStory(
        this: User,
        title: string,
        content: string,
        category: STORY_CATEGORY,
        imageFiles: Express.Multer.File[]
    ) {
        let statusCode = STATUS_CODE.successful.created;
        let message = 'The story was created successfully.';

        const userStoriesNr = await countUserStories(this.id);

        if (userStoriesNr >= MAX_STORIES_NR) {
            statusCode = STATUS_CODE.client.methodNotAllowed;
            message = 'You have reached the maximum number of stories per user.';
        } else {
            // Divided by 2 because every image has a thumbnail too
            const imagesNr = imageFiles.length / 2;

            const createdStory = await createStoryInDatabase({
                title,
                content,
                imagesNr,
                category,
                userId: this.id,
            });

            if (imagesNr > 0) {
                await uploadStoryImagesToS3(imageFiles, this.uuid, createdStory.uuid);
            }
        }

        return ({ statusCode, message });
    }

    async deleteStory(this: User, storyUuid: string) {
        let statusCode = STATUS_CODE.successful.ok;
        let message = 'The story has been successfully deleted.';

        const story = await getStory(storyUuid);

        if (!story) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'The story does not exist in the database.';
        } else if (story.status === STORY_STATUS.DELETED) {
            message = 'The story is already deleted.';
        } else if (story.userId !== this.id && !this.isAdmin) {
            statusCode = STATUS_CODE.client.methodNotAllowed;
            message = 'The story you want to delete does not belong to you.';
        } else {
            await updateStoryStatus(storyUuid);

            await createDeletedStory(story.id, this.id);
        }

        return ({ statusCode, message });
    }

    async heartOrUnheartStory(this: User, storyUuid: string, isHearting: boolean) {
        let statusCode = isHearting ? STATUS_CODE.successful.created : STATUS_CODE.successful.ok;
        let message = null;

        const story = await getStory(storyUuid);

        if (!story) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'The story does not exist in the database.';
        } else if (story.status === STORY_STATUS.DELETED) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'The story has been deleted.';
        } else {
            const heart = await getHeart(this.id, story.id);

            // The user wants to HEART the story
            if (isHearting) {
                if (heart) {
                    message = 'The story is already hearted.';
                } else {
                    await createHeart(this.id, story.id);
                }
            // The user wants to UNHEART the story
            } else if (!heart) {
                message = 'The story is already unhearted.';
            } else {
                await deleteHeart(this.id, story.id);
            }
        }

        return ({ statusCode, message });
    }

    async deleteOrBanUser(this: User, userUuid: string, isBanning: boolean) {
        let statusCode = STATUS_CODE.successful.ok;
        let message = 'The account has been successfully deleted.';

        const user = await getUserByUuid(userUuid);

        if (!user) {
            statusCode = STATUS_CODE.client.notFound;
            message = 'There is no account with the specified id.';
        } else if (user.status === USER_STATUS.DELETED) {
            message = 'The account is already deleted.';
        } else if (user.status === USER_STATUS.BANNED) {
            message = 'The account is already banned.';
        } else if (isBanning && !this.isAdmin) {
            statusCode = STATUS_CODE.client.methodNotAllowed;
            message = 'The account you want to delete does not belong to you.';
        } else {
            // Get all the user's stories and update their status to 'DELETED'
            const allStoriesId = await getStoriesIdByUser(user.id);

            await updateStoriesToStatusDeleted(allStoriesId);

            // Create an insertion for every user's story in the 'deleted_stories' table
            const deletedStories = allStoriesId.map(storyPk => ({
                storyId: storyPk,
                deletedBy: this.id,
            }));

            await createDeletedStories(deletedStories);

            // Update the user's status
            let userStatus = USER_STATUS.DELETED;

            if (isBanning) {
                message = 'The account has been successfully banned.';

                userStatus = USER_STATUS.BANNED;
            }

            await updateUserStatus(user.id, userStatus);

            await createDeletedUser(user.id, this.id);
        }

        return ({ statusCode, message });
    }

    async updateUser(this: User, userId: number, wantsToBeAnonymous: boolean) {
        const statusCode = STATUS_CODE.successful.ok;
        let message = 'The changes have been successfully made.';

        const user = (await getUser(userId))!;

        if (wantsToBeAnonymous && user.status === USER_STATUS.ANONYMOUS) {
            message = 'You are already an anonymous author.';
        } else if (!wantsToBeAnonymous && user.status === USER_STATUS.NORMAL) {
            message = 'You are already a normal author.';
        } else {
            await updateUserStatus(user.id, wantsToBeAnonymous ? USER_STATUS.ANONYMOUS : USER_STATUS.NORMAL);
        }

        return ({ statusCode, message });
    }
}

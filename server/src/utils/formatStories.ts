import Story from '../models/story/story.class';
import { getStoryImageS3Key, getObjectsFromS3 } from './services/s3';
import { STORY_IMAGE_FILE_EXTENSION, STORY_IMAGE_MIME_TYPE } from '../constants/image';
import convertBufferToBase64 from './convertBufferToBase64';
import { FormattedStory } from '../types/story';
import { USER_STATUS } from '../constants/user';

export default async (
    userId: number,
    isAdmin: boolean,
    myStories: boolean,
    stories: Story[],
) => {
    const thumbnailsKeys: string[] = [];

    // Put all the thumbnail keys into one array
    stories.forEach((story) => {
        if (story.imagesNr > 0) {
            for (let i = 1; i <= story.imagesNr; i++) {
                thumbnailsKeys.push(getStoryImageS3Key(
                    story.user.uuid,
                    story.uuid,
                    `${i}_t.${STORY_IMAGE_FILE_EXTENSION}`
                ));
            }
        }
    });

    // Get the image files from S3
    const thumbnailsData = await getObjectsFromS3(thumbnailsKeys);

    let currentImageIndexInThumbnails = 0;

    return stories.map((story) => {
        const images = [];

        // Attach the image files to the story
        if (story.imagesNr > 0) {
            for (let i = 1; i <= story.imagesNr; i++) {
                images.push(convertBufferToBase64(
                    thumbnailsData[currentImageIndexInThumbnails].Body as Buffer,
                    STORY_IMAGE_MIME_TYPE
                ));

                currentImageIndexInThumbnails++;
            }
        }

        const isHearted = story.hearts.some(heart => heart.heartedBy === userId);

        const formattedStory: FormattedStory = {
            uuid: story.uuid,
            title: story.title,
            category: story.category,
            content: story.content,
            createdAt: story.createdAt,
            isHearted: isHearted!!,
            heartsNr: story.hearts.length,
            images,
        };

        // If an admin user is on the 'Explore stories' page every user will be visible for them (even the ones who set
        // to be an anonymous author)
        if ((isAdmin && !myStories) || story.user.status !== USER_STATUS.ANONYMOUS) {
            formattedStory.author = {
                uuid: story.user.uuid,
                name: story.user.name,
                photo: story.user.photo,
            };
        // If a user (normal or admin) is on the 'My stories' page they need the UUIDs of the stories in order to be
        // able to delete them
        } else if (myStories) {
            formattedStory.author = {
                uuid: story.user.uuid,
            };
        }

        return formattedStory;
    });
};

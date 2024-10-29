import S3 from 'aws-sdk/clients/s3';
import { AWS_URI } from '../../constants/uri';

export const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
});

export const getImageS3Key = (fileName: string) => `${AWS_URI.images.folder}/${fileName}`;

export const getStoryImageS3Key = (
    userUuid: string,
    storyUuid: string,
    fileName: string,
) => `${AWS_URI.users.folder}/${userUuid}/${AWS_URI.users.stories.folder}/${storyUuid}/` +
    `${AWS_URI.users.stories.images.folder}/${fileName}`;

export const getObjectFromS3 = (key: string) => s3.getObject({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
}).promise();

export const getObjectsFromS3 = (keys: string[]) => Promise.all(keys.map(key => getObjectFromS3(key)));

export const uploadStoryImagesToS3 = (
    files: Express.Multer.File[],
    userUuid: string,
    storyUuid: string
) => Promise.all(
    files.map(file => s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: getStoryImageS3Key(userUuid, storyUuid, file.originalname),
        Body: file.buffer,
    }).promise())
);

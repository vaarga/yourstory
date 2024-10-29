// The 'folder' key's value should always be the parent key name written in kebab case
export const AWS_URI = {
    images: {
        folder: 'images',
    },
    users: {
        folder: 'users',
        stories: {
            folder: 'stories',
            images: {
                folder: 'images',
            },
        },
    },
};

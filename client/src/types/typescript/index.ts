import { STORY_CATEGORY } from '../../constants/story';

export type Author = {
    uuid: string;
    name: string;
    photo: null | string;
};

// On the 'My Stories' page the anonymous author will have 'uuid'
export type MyStoriesAnonymousAuthor = {
    uuid: string;
};

export type Story = {
    uuid: string;
    title: string;
    category: STORY_CATEGORY;
    content: string;
    createdAt: string;
    isHearted: boolean;
    heartsNr: number;
    images: string[];
    resizedImages?: {
        1?: string;
        2?: string;
        3?: string;
    };
    author?: Author | MyStoriesAnonymousAuthor;
};

import { STORY_CATEGORY } from '../constants/story';

export type StoryPostBody = {
    title: string;
    content: string;
    category: STORY_CATEGORY;
};

export type Story = StoryPostBody & {
    imagesNr: number;
    userId: number;
};

export type FormattedStory = {
    uuid: string;
    title: string;
    category: STORY_CATEGORY;
    content: string;
    createdAt: Date;
    isHearted: boolean;
    heartsNr: number;
    images: string[];
    author?: {
        uuid: string;
        name: string;
        photo: null | string;
    } | {
        uuid: string;
    };
};

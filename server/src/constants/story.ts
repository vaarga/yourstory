// The maximum number of stories a user can have
export const MAX_STORIES_NR = 10;

export const STORY_MAX = {
    titleLength: 20,
    contentLength: 2000,
    imagesNr: 3,
};

export enum STORY_CATEGORY {
    ACTION = 'ACTION',
    COMEDY = 'COMEDY',
    MYSTERY = 'MYSTERY',
    FANTASY = 'FANTASY',
    HORROR = 'HORROR',
    SCIENCE_FICTION = 'SCIENCE_FICTION',
    ROMANCE = 'ROMANCE',
}

export enum STORY_STATUS {
    NORMAL = 'NORMAL',
    DELETED = 'DELETED',
}

export const STORY_PAGINATION_NR = 5;

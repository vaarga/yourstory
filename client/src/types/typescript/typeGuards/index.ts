import { Author, MyStoriesAnonymousAuthor } from '../index';

export const isAuthor = (
    author: Author | MyStoriesAnonymousAuthor
): author is Author => (author as Author).name !== undefined;

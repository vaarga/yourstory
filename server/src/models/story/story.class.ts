import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from 'sequelize';
import { STORY_CATEGORY, STORY_STATUS } from '../../constants/story';
import User from '../user/user.class';
import Heart from '../heart/heart.class';

export default class Story extends Model<InferAttributes<Story>, InferCreationAttributes<Story>> {
    declare id: CreationOptional<number>;

    declare uuid: CreationOptional<string>;

    declare title: string;

    declare content: string;

    declare imagesNr: number;

    declare category: STORY_CATEGORY;

    declare status: CreationOptional<STORY_STATUS>;

    declare createdAt: CreationOptional<Date>;

    declare userId: ForeignKey<User['id']>;

    declare user: NonAttribute<User>;

    declare hearts: NonAttribute<Heart[]>;
}

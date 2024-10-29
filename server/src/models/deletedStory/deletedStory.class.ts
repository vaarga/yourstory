import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import User from '../user/user.class';

export default class DeletedStory extends Model<InferAttributes<DeletedStory>, InferCreationAttributes<DeletedStory>> {
    declare id: CreationOptional<number>;

    declare storyId: number;

    declare deletedAt: CreationOptional<Date>;

    declare deletedBy: ForeignKey<User['id']>;
}

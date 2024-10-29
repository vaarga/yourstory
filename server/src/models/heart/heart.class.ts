import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import User from '../user/user.class';
import Story from '../story/story.class';

export default class Heart extends Model<InferAttributes<Heart>, InferCreationAttributes<Heart>> {
    declare id: CreationOptional<number>;

    declare createdAt: CreationOptional<Date>;

    declare heartedBy: ForeignKey<User['id']>;

    declare storyId: ForeignKey<Story['id']>;
}

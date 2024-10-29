import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import User from '../user/user.class';

export default class DeletedUser extends Model<InferAttributes<DeletedUser>, InferCreationAttributes<DeletedUser>> {
    declare id: CreationOptional<number>;

    declare userId: number;

    declare deletedAt: CreationOptional<Date>;

    declare deletedBy: ForeignKey<User['id']>;
}

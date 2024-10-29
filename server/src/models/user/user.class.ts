import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { USER_STATUS } from '../../constants/user';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;

    declare uuid: CreationOptional<string>;

    declare googleId: string;

    declare email: null | string;

    declare name: string;

    declare photo: null | string;

    declare isAdmin: CreationOptional<boolean>;

    declare status: CreationOptional<USER_STATUS>;

    declare createdAt: CreationOptional<Date>;
}

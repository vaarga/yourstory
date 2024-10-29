import { DataTypes, Sequelize } from 'sequelize';
import { USER_STATUS } from '../../constants/user';

export default ({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    status: {
        type: DataTypes.ENUM({
            values: Object.keys(USER_STATUS),
        }),
        allowNull: false,
        defaultValue: USER_STATUS.NORMAL,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        validate: {
            isDate: true,
        },
    },
});

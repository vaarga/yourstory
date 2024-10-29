import { DataTypes, Sequelize } from 'sequelize';

export default ({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    storyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        validate: {
            isDate: true,
        },
    },
});

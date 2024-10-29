import { DataTypes, Sequelize } from 'sequelize';

export default ({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
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

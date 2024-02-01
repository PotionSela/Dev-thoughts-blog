// Imports
const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {};

// Comment Table Model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        blogPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post_id",
                key: "id",
            },
        },
    },
    {
        // Link to database connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

// Export Link
module.exports = Comment;
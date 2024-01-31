// Imports
const { Model, DataTypes} = require("sequelize");
const sequelize = require("../congig/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    // Method to check if the provided login password matches the hashed password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// User Table Model
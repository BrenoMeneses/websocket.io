const { DataTypes } = require('sequelize')
const {sequelize} = require('./connection')

const user = sequelize.define('user', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

user.sync()

module.exports = user
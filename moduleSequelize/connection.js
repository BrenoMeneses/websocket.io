const {Sequelize} = require('sequelize')

const sequelize =  new Sequelize('chatApp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conexao ao banco de dados feita!!')
} catch(error) {
    console.error('erro: ' + error)
}

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

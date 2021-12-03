// const mysql = require('mysql')

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'maikon',
//     password: '',
//     database: '',
// })
require('dotenv').config()
const { CODEBUILD } = require('ci-info')
const { Sequelize } = require('sequelize')

const DB_PASSWORD = process.env.PASS
const DB_USER = process.env.USER
const sequelize = new Sequelize('nodejscurso', DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'

}

)


try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso o Sequelize')
}catch(err) {
    console.log('não foi possivel conectar: ', error)
}

module.exports = sequelize
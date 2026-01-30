// database/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Para não poluir o console com SQL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Obrigatório para o Render
    }
  }
});

module.exports = sequelize;
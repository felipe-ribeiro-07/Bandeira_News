// models/Noticia.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Noticia = sequelize.define(
  "Noticia",
  {
    // O Sequelize cria o ID automaticamente se não definirmos
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "noticias", // Nome da tabela no banco
    timestamps: true, // Cria automaticamente 'createdAt' e 'updatedAt'
  },
);

module.exports = Noticia;

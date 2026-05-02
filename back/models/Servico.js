import banco from "../Banco.js";
import { DataTypes } from "sequelize";

const Servico = banco.define(
  "servico",
  {
    id: {
      type: DataTypes.BIGINT, // bigserial
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duracaoHoras: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Servico;

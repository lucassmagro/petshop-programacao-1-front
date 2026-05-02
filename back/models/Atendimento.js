import banco from "../Banco.js";
import { DataTypes } from "sequelize";

const Atendimento = banco.define(
  "atendimento",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nomePet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeDono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idservico: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    valorTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tempoEstimado: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default Atendimento;

// configuracao do banco de dados
import { Sequelize } from "sequelize";

const banco = new Sequelize("petshop", "postgres", "postgres", {
  host: "localhost",
  port: 5432, // porta padrao
  dialect: "postgres",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

export default banco;

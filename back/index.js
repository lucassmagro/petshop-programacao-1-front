import express from "express";
import banco from "./Banco.js";

import ServicoController from "./controllers/ServicoController.js";
import AtendimentoController from "./controllers/AtendimentoController.js";

const app = express();
app.use(express.json());

// Rotas de servico
// Criar
app.post("/servico", ServicoController.inserir);

// Listar todos
app.get("/servico", ServicoController.listar);

// Buscar por ID
app.get("/servico/:id", ServicoController.selecionar);

// Atualizar
app.put("/servico/:id", ServicoController.alterar);

// Deletar
app.delete("/servico/:id", ServicoController.excluir);

// Rotas atendimento

// Criar
app.post("/atendimento", AtendimentoController.inserir);

// Listar todos
app.get("/atendimento", AtendimentoController.listar);

// Buscar por ID
app.get("/atendimento/:id", AtendimentoController.selecionar);

// Atualizar
app.put("/atendimento/:id", AtendimentoController.alterar);

// Deletar
app.delete("/atendimento/:id", AtendimentoController.excluir);

// inicia o servidor
banco
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar no banco:", erro);
  });

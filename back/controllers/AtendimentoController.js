import Atendimento from "../models/Atendimento.js";
import Servico from "../models/Servico.js";

async function listar(req, res) {
  const dados = await Atendimento.findAll();
  return res.json(dados);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const dados = await Atendimento.findByPk(id);
  return res.json(dados);
}

async function excluir(req, res) {
  const id = req.params.id;
  const dados = await Atendimento.destroy({ where: { id: id } });
  return res.json(dados);
}

async function inserir(req, res) {
  const nomePet = req.body.nomePet;
  const nomeDono = req.body.nomeDono;
  const idservico = req.body.idservico;

  // 🔍 busca o serviço
  const servico = await Servico.findByPk(idservico);

  if (!servico) {
    return res.json({ erro: "Serviço não encontrado" });
  }

  // 🧠 regra de negócio
  const valorTotal = servico.preco;
  const tempoEstimado = servico.duracaoHoras;

  const dados = await Atendimento.create({
    nomePet: nomePet,
    nomeDono: nomeDono,
    idservico: idservico,
    valorTotal: valorTotal,
    tempoEstimado: tempoEstimado,
  });

  return res.json(dados);
}

async function alterar(req, res) {
  const id = req.params.id;
  const nomePet = req.body.nomePet;
  const nomeDono = req.body.nomeDono;
  const idservico = req.body.idservico;

  // 🔍 busca o serviço novo
  const servico = await Servico.findByPk(idservico);

  if (!servico) {
    return res.json({ erro: "Serviço não encontrado" });
  }

  // 🧠 recalcula
  const valorTotal = servico.preco;
  const tempoEstimado = servico.duracaoHoras;

  const dados = await Atendimento.update(
    {
      nomePet: nomePet,
      nomeDono: nomeDono,
      idservico: idservico,
      valorTotal: valorTotal,
      tempoEstimado: tempoEstimado,
    },
    { where: { id: id } },
  );

  return res.json(dados);
}

export default { listar, selecionar, excluir, inserir, alterar };

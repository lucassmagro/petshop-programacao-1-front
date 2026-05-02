import Servico from "../models/Servico.js";

async function listar(req, res) {
  const dados = await Servico.findAll();
  return res.json(dados);
}

async function selecionar(req, res) {
  const id = req.params.id;
  const dados = await Servico.findByPk(id);
  return res.json(dados);
}

async function excluir(req, res) {
  const id = req.params.id;
  const dados = await Servico.destroy({ where: { id: id } });
  return res.json(dados);
}

async function inserir(req, res) {
  const descricao = req.body.descricao;
  const preco = req.body.preco;
  const duracaoHoras = req.body.duracaoHoras;

  const dados = await Servico.create({
    descricao: descricao,
    preco: preco,
    duracaoHoras: duracaoHoras,
  });

  return res.json(dados);
}

async function alterar(req, res) {
  const id = req.params.id;
  const descricao = req.body.descricao;
  const preco = req.body.preco;
  const duracaoHoras = req.body.duracaoHoras;

  const dados = await Servico.update(
    {
      descricao: descricao,
      preco: preco,
      duracaoHoras: duracaoHoras,
    },
    { where: { id: id } },
  );

  return res.json(dados);
}

export default { listar, selecionar, excluir, inserir, alterar };

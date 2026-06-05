import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarAtendimento,
  buscarAtendimento,
  atualizarAtendimento,
} from "../../services/atendimentoService";
import { listarServicos } from "../../services/servicoService";

function AtendimentoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomePet: "",
    nomeDono: "",
    idservico: "",
  });
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    // Carrega lista de serviços para o select
    listarServicos()
      .then((res) => setServicos(res.data))
      .catch(() => toast.error("Erro ao carregar serviços!"));

    // Se for edição, carrega dados do atendimento
    if (id) {
      buscarAtendimento(id)
        .then((res) =>
          setForm({
            nomePet: res.data.nomePet,
            nomeDono: res.data.nomeDono,
            idservico: res.data.idservico,
          }),
        )
        .catch(() => toast.error("Erro ao buscar atendimento!"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarAtendimento(id, form);
        toast.success("Atendimento atualizado com sucesso!");
      } else {
        await criarAtendimento(form);
        toast.success("Atendimento cadastrado com sucesso!");
      }
      navigate("/atendimentos");
    } catch (err) {
      toast.error("Erro ao salvar atendimento!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Atendimento" : "Novo Atendimento"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nome do Pet</label>
          <input
            name="nomePet"
            value={form.nomePet}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nome do Dono</label>
          <input
            name="nomeDono"
            value={form.nomeDono}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Serviço</label>
          <select
            name="idservico"
            value={form.idservico}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.descricao} — R$ {Number(s.preco).toFixed(2)} (
                {s.duracaoHoras}h)
              </option>
            ))}
          </select>
          <small className="text-muted">
            O valor total e o tempo estimado são calculados automaticamente.
          </small>
        </div>
        <button type="submit" className="btn btn-success me-2">
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/atendimentos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default AtendimentoForm;

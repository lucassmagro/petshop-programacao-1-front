import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  criarServico,
  buscarServico,
  atualizarServico,
} from "../../services/servicoService";

function ServicoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    descricao: "",
    preco: "",
    duracaoHoras: "",
  });

  useEffect(() => {
    if (id) {
      buscarServico(id)
        .then((res) => setForm(res.data))
        .catch(() => toast.error("Erro ao buscar serviço!"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarServico(id, form);
        toast.success("Serviço atualizado com sucesso!");
      } else {
        await criarServico(form);
        toast.success("Serviço cadastrado com sucesso!");
      }
      navigate("/");
    } catch (err) {
      toast.error("Erro ao salvar serviço!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Serviço" : "Novo Serviço"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preço (R$)</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            value={form.preco}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duração (horas)</label>
          <input
            name="duracaoHoras"
            type="number"
            step="0.5"
            value={form.duracaoHoras}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ServicoForm;

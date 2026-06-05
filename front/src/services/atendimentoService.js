import axios from "axios";

const API = "http://localhost:3000";

export const listarAtendimentos = () => axios.get(`${API}/atendimento`);
export const buscarAtendimento = (id) => axios.get(`${API}/atendimento/${id}`);
export const criarAtendimento = (dados) =>
  axios.post(`${API}/atendimento`, dados);
export const atualizarAtendimento = (id, dados) =>
  axios.put(`${API}/atendimento/${id}`, dados);
export const deletarAtendimento = (id) =>
  axios.delete(`${API}/atendimento/${id}`);

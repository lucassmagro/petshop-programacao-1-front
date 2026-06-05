import axios from "axios";

const API = "http://localhost:3000";

export const listarServicos = () => axios.get(`${API}/servico`);
export const buscarServico = (id) => axios.get(`${API}/servico/${id}`);
export const criarServico = (dados) => axios.post(`${API}/servico`, dados);
export const atualizarServico = (id, dados) =>
  axios.put(`${API}/servico/${id}`, dados);
export const deletarServico = (id) => axios.delete(`${API}/servico/${id}`);

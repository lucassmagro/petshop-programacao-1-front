import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ServicoList from "./pages/servico/ServicoList";
import ServicoForm from "./pages/servico/ServicoForm";
import AtendimentoList from "./pages/atendimento/AtendimentoList";
import AtendimentoForm from "./pages/atendimento/AtendimentoForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<ServicoList />} />
        <Route path="/servico/novo" element={<ServicoForm />} />
        <Route path="/servico/editar/:id" element={<ServicoForm />} />
        <Route path="/atendimentos" element={<AtendimentoList />} />
        <Route path="/atendimento/novo" element={<AtendimentoForm />} />
        <Route path="/atendimento/editar/:id" element={<AtendimentoForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

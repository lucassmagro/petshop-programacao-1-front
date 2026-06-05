# 🐾 Petshop Programação 1 - Sistema de Gerenciamento

Este é um sistema web full-stack desenvolvido para gerenciamento de serviços e atendimentos de um pet shop. O projeto possui um front-end moderno, responsivo e estilizado com foco em uma experiência do usuário (UI/UX) premium, conectado a um back-end estruturado com banco de dados relacional.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **React** (v19) com componentes funcionais e Hooks.
- **React Router DOM** (v7) para o roteamento interno.
- **Axios** para consumo da API RESTful.
- **Bootstrap 5 & Bootstrap Icons** para auxílio de grid e ícones modernos.
- **React Toastify** para notificações interativas e bonitas de sucesso/erro.
- **Custom CSS** com paleta HSL customizada, animações, e suporte total a dispositivos móveis.

### Back-end
- **Node.js** com **Express** para criação da API.
- **Sequelize ORM** para abstração e comunicação com o banco de dados.
- **PostgreSQL** como banco de dados relacional.

---

## 🚀 Como Iniciar o Projeto

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- **Node.js** (v16 ou superior)
- **PostgreSQL** rodando localmente

---

### 1. 🗄️ Configuração do Banco de Dados

1. Acesse o seu gerenciador de banco de dados PostgreSQL (como o pgAdmin ou terminal `psql`).
2. Crie um novo banco de dados chamado `petshop`:
   ```sql
   CREATE DATABASE petshop;
   ```
3. O arquivo de configuração de banco de dados está localizado em `back/Banco.js`. Certifique-se de que os dados de conexão correspondem às suas credenciais do PostgreSQL:
   ```javascript
   const banco = new Sequelize("petshop", "seu_usuario", "sua_senha", {
     host: "localhost",
     port: 5432,
     dialect: "postgres",
     // ...
   });
   ```
   *(O padrão configurado é usuário `postgres` e senha `postgres`)*.

---

### 2. 🔌 Iniciando o Back-end (API)

O back-end do projeto rodará na porta **3000** e o Sequelize criará automaticamente as tabelas necessárias no primeiro sincronismo.

1. Abra o terminal e navegue até a pasta `back`:
   ```bash
   cd back
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node index.js
   ```
   *Você deverá ver a mensagem: `Servidor rodando na porta 3000`*.

---

### 3. 💻 Iniciando o Front-end (React)

O front-end iniciará e consumirá a API na porta **3001** (caso o back-end já esteja na porta 3000, o React perguntará se deseja rodar em outra porta; confirme com `Y`).

1. Abra um novo terminal e navegue até a pasta `front`:
   ```bash
   cd front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. O navegador abrirá automaticamente o projeto no endereço `http://localhost:3001`.

---

## 🎨 Principais Melhorias de UI/UX Implementadas

- **Landing Page**: Uma página inicial completa apresentando os serviços e o conceito do Pet Shop com design limpo e moderno.
- **Componentes Visuais Premium**:
  - **Navbar Horizontal**: Fluida, alinhada à direita e responsiva para mobile.
  - **Sidebar de Navegação**: Para acesso rápido a todas as áreas.
  - **Footer Customizado**: Com uma assinatura estilosa.
  - **Favicon Personalizado**: Uma patinha de cachorro substituindo o ícone padrão do React.
- **Melhorias de Usabilidade**:
  - **Shimmer Effect (Skeleton loading)**: Animação suave de carregamento nas tabelas de dados, melhorando a percepção de performance.
  - **Modal de Confirmação**: Substituição do `window.confirm` padrão por um modal moderno e estilizado para evitar deleções acidentais.
  - **Feedbacks Visuais (Toastify)**: Notificações elegantes de sucesso e erro ao criar, editar ou excluir registros.
- **Responsividade Total**: Layout adaptável a qualquer tela (desktops, tablets e celulares).

---

## 👥 Autores
- **Lucas Santos Magro** (Desenvolvimento e Integrações)
- **Antigravity** (Assistência no Design UI/UX e Frontend)

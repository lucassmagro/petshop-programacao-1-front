# Petshop Programação 1 — Sistema de Gerenciamento

Sistema web full-stack desenvolvido para gerenciamento de serviços e atendimentos de um pet shop. O projeto possui um front-end moderno, responsivo e estilizado com foco em uma experiência do usuário (UI/UX) premium, conectado a um back-end estruturado com banco de dados relacional.

---

## Tecnologias Utilizadas

### Front-end

- **React** (v19) com componentes funcionais e Hooks
- **React Router DOM** (v7) para roteamento interno
- **Axios** para consumo da API RESTful
- **Bootstrap 5 & Bootstrap Icons** para auxílio de grids e ícones modernos
- **React Toastify** para notificações interativas de sucesso/erro
- **Custom CSS** com paleta HSL customizada, animações fluidas e suporte total a dispositivos móveis

### Back-end

- **Node.js** com **Express** para criação da API REST
- **Sequelize ORM** para abstração e comunicação com o banco de dados
- **PostgreSQL** como banco de dados relacional
- **CORS** habilitado para comunicação segura entre front-end e back-end

---

## Estrutura do Repositório

```text
petshop-programacao-1/
├── back/
│   ├── controllers/
│   │   ├── AtendimentoController.js
│   │   └── ServicoController.js
│   ├── models/
│   │   ├── Atendimento.js
│   │   └── Servico.js
│   ├── Banco.js
│   ├── index.js
│   └── package.json
├── front/
│   ├── public/
│   │   ├── favicon.png (Ícone de patinha personalizado)
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmModal.js (Modal customizado para exclusão)
│   │   │   ├── Footer.js (Rodapé padrão)
│   │   │   ├── Navbar.js (Menu horizontal responsivo)
│   │   │   └── Sidebar.js (Menu lateral para navegação rápida)
│   │   ├── pages/
│   │   │   ├── atendimento/
│   │   │   │   ├── AtendimentoForm.js
│   │   │   │   └── AtendimentoList.js
│   │   │   ├── servico/
│   │   │   │   ├── ServicoForm.js
│   │   │   │   └── ServicoList.js
│   │   │   └── LandingPage.js (Página de entrada moderna)
│   │   ├── services/
│   │   │   ├── atendimentoService.js
│   │   │   └── servicoService.js
│   │   ├── App.css (Estilização geral e temas HSL)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── petshop.sql (Dump do banco de dados com estrutura e registros de teste)
└── README.md
```

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

| Software   | Versão Mínima  | Como Verificar   | Download Oficial        |
| ---------- | -------------- | ---------------- | ----------------------- |
| Node.js    | 16 ou superior | `node -v`        | nodejs.org              |
| PostgreSQL | Qualquer       | `psql --version` | postgresql.org/download |
| Git        | Qualquer       | `git --version`  | git-scm.com             |

---

## Como Iniciar o Projeto

### Passo 1 — Clonar o Repositório

```bash
git clone https://github.com/lucassmagro/petshop-programacao-1
cd petshop-programacao-1
```

---

### Passo 2 — Configurar o Banco de Dados

Acesse o PostgreSQL e crie o banco de dados:

**Via terminal:**

```bash
psql -U postgres -c "CREATE DATABASE petshop;"
```

**Via pgAdmin:**

1. No painel esquerdo, clique com o botão direito em **Databases**
2. Selecione **Create → Database**
3. Em **Database**, digite `petshop`
4. Clique em **Save**

O arquivo de configuração da conexão está localizado em `back/Banco.js`. O padrão configurado é:

```javascript
const banco = new Sequelize("petshop", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
```

> Nota: Se as suas credenciais locais do PostgreSQL forem diferentes (usuário ou senha), edite este arquivo antes de prosseguir.

---

### Passo 3 — Importar os Dados de Exemplo

Para popular o banco de dados com tabelas e registros iniciais de teste, utilize o arquivo `petshop.sql` disponível na raiz do repositório.

**Via terminal:**

```bash
psql -U postgres -d petshop -f petshop.sql
```

**Via pgAdmin:**

1. No painel esquerdo, expanda as bases e clique com o botão direito no banco `petshop`
2. Selecionar **Query Tool**
3. Abra o arquivo `petshop.sql` na ferramenta de consulta ou cole seu conteúdo
4. Clique em **Execute/Refresh** (F5) para rodar o script e popular o banco

---

### Passo 4 — Iniciar o Back-end

O servidor rodará na porta **3000**. O Sequelize sincronizará automaticamente as models com o banco de dados.

```bash
cd back
npm install
node index.js
```

Você deverá ver a mensagem no terminal:

```text
Servidor rodando na porta 3000
```

---

### Passo 5 — Iniciar o Front-end

O front-end consome a API na porta `3000`. O React iniciará por padrão em uma porta secundária (geralmente `3001`) caso a porta `3000` já esteja em uso pelo back-end. Confirme com `Y` no terminal se for solicitado.

```bash
cd front
npm install
npm start
```

O navegador abrirá automaticamente no endereço `http://localhost:3001`.

> **Forçar porta 3001 manualmente (opcional):**
>
> No Windows (PowerShell):
> ```powershell
> $env:PORT = 3001; npm start
> ```
>
> No Windows (Prompt de Comando CMD):
> ```cmd
> set PORT=3001 && npm start
> ```

---

## Endpoints da API

### Serviços (`/servico`)

| Método | URL          | Body (JSON)                                          | Descrição          |
| ------ | ------------ | ---------------------------------------------------- | ------------------ |
| GET    | /servico     | —                                                    | Lista todos        |
| GET    | /servico/:id | —                                                    | Busca por ID       |
| POST   | /servico     | `{ "descricao": "", "preco": 0, "duracaoHoras": 0 }` | Cria novo serviço  |
| PUT    | /servico/:id | `{ "descricao": "", "preco": 0, "duracaoHoras": 0 }` | Atualiza um serviço|
| DELETE | /servico/:id | —                                                    | Remove um serviço  |

### Atendimentos (`/atendimento`)

| Método | URL              | Body (JSON)                                         | Descrição              |
| ------ | ---------------- | --------------------------------------------------- | ---------------------- |
| GET    | /atendimento     | —                                                   | Lista todos            |
| GET    | /atendimento/:id | —                                                   | Busca por ID           |
| POST   | /atendimento     | `{ "nomePet": "", "nomeDono": "", "idservico": 1 }` | Cria novo atendimento  |
| PUT    | /atendimento/:id | `{ "nomePet": "", "nomeDono": "", "idservico": 1 }` | Atualiza um atendimento|
| DELETE | /atendimento/:id | —                                                   | Remove um atendimento  |

> **Regra de Negócio Importante:** Ao cadastrar ou editar um atendimento, os campos `valorTotal` e `tempoEstimado` são calculados e salvos automaticamente pelo back-end baseando-se no serviço vinculado (`idservico`). Evite enviá-los no corpo da requisição.

---

## Principais Funcionalidades

- **Gestão Completa de Serviços**: Cadastro, edição, visualização e remoção de serviços com controle de preço e duração.
- **Gestão Completa de Atendimentos**: Agendamento vinculando o animal (pet), o dono e o tipo de serviço.
- **Cálculo Automático**: Totalização de valores e estimativa de tempo gerados automaticamente no banco através da API.
- **Anotações e Notificações Visuais**: Alertas de sucesso/erro integrados com `react-toastify` para guiar as ações do usuário.
- **Interface Segura (Confirmação)**: Modais customizados que pedem dupla confirmação antes de ações destrutivas (exclusões).
- **Feedback de Carregamento**: Animações de esqueleto (Skeleton load/Shimmer effect) que evitam telas em branco durante chamadas de API.
- **Visual Moderno e Responsivo**: Layout construído com técnicas modernas de CSS, adaptável para celulares, tablets e monitores desktop.

---

## Configurando em Outro Computador

Para rodar o projeto em um ambiente limpo para apresentação:

1. Instale o Node.js, PostgreSQL e Git.
2. Clone o repositório:
   ```bash
   git clone https://github.com/lucassmagro/petshop-programacao-1
   cd petshop-programacao-1
   ```
3. Crie a base de dados:
   ```bash
   psql -U postgres -c "CREATE DATABASE petshop;"
   ```
4. Importe o dump de dados:
   ```bash
   psql -U postgres -d petshop -f petshop.sql
   ```
5. Acesse a pasta `back`, instale as dependências e inicie o servidor:
   ```bash
   cd back
   npm install
   node index.js
   ```
6. Em outro terminal, acesse `front`, instale as dependências e inicie a interface:
   ```bash
   cd front
   npm install
   npm start
   ```

---

## Observações

- **Segurança de Credenciais**: As chaves do banco de dados estão expostas em `back/Banco.js` para simplificar fins acadêmicos. Em ambientes de produção, recomenda-se o uso de `.env` para carregar dados confidenciais dinamicamente.
- **Gerenciamento de Tabelas**: O Sequelize utiliza `sync()` para autossincronização de tabelas em tempo de desenvolvimento. Para produção, é recomendado utilizar Migrations.
- **Integração de Endereços**: O front-end aponta requisições para `http://localhost:3000`. Se a porta padrão do back-end for alterada, lembre-se de reconfigurar a URL correspondente na pasta `front/src/services/`.

---

## Autores

- **Lucas Santos Magro** — Desenvolvimento e integrações

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de Programação I — Sistemas de Informação — Unoesc.

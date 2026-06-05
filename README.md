# Petshop - Projeto Fullstack

Projeto de exemplo para gerenciamento de serviços e atendimentos de um petshop, com backend em Node.js/Express + Sequelize (Postgres) e frontend em React (Create React App).

## Estrutura do repositório

- `back/` - código do servidor (Node.js, Express, Sequelize).
- `front/` - aplicação cliente em React (Create React App).

Arquivos importantes:

- [back/Banco.js](back/Banco.js): configuração da conexão com o banco de dados.
- [back/index.js](back/index.js): ponto de entrada do servidor.
- [front/src/services](front/src/services): chamadas HTTP para a API.

## Pré-requisitos

- Node.js (recomendado >= 16) e npm
- PostgreSQL (servidor de banco de dados)
- Git (para clonar o repositório)

## Configuração do banco de dados

O backend usa Sequelize e está configurado em [back/Banco.js](back/Banco.js). Por padrão ele tenta conectar em:

- database: `petshop`
- usuário: `postgres`
- senha: `postgres`
- host: `localhost`
- porta: `5432`

Você tem duas opções:

1. Criar o banco/usuário com essas credenciais (ex.: via `psql`) e executar o servidor.
   - Exemplo:

     ```bash
     psql -U postgres
     CREATE DATABASE petshop;
     -- ajustar usuário/senha se necessário
     ```

2. Ou alterar as credenciais diretamente em [back/Banco.js](back/Banco.js) para corresponder ao seu ambiente.

Observação: uma boa prática é alterar `back/Banco.js` para ler as configurações de variáveis de ambiente. Por exemplo:

```js
const banco = new Sequelize(
  process.env.DB_NAME || "petshop",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    dialect: "postgres",
  },
);
```

## Rodando o backend

1. Abra um terminal e entre na pasta do backend:

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

O servidor inicia na porta `3000` (conforme `back/index.js`). O Sequelize fará o `sync()` e criará as tabelas a partir dos modelos se necessário.

## Rodando o frontend

1. Em outro terminal, entre na pasta do frontend:

```bash
cd front
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação React:

```bash
npm start
```

Por padrão o Create React App usa a porta `3000`. Se o backend já estiver usando a `3000`, o CRA irá perguntar se você quer rodar em outra porta (por exemplo `3001`). Para forçar uma porta diferente no Windows PowerShell:

```powershell
#$env:PORT = 3001; npm start
```

Ou no Windows CMD:

```cmd
set PORT=3001 && npm start
```

O frontend faz requisições para a API em `http://localhost:3000` (veja `front/src/services/*Service.js`). Se você mudar a porta do backend, atualize os arquivos de serviço ou use uma variável de ambiente.

## Scripts úteis

- Backend: dentro de `back/` você pode executar `node index.js` para iniciar.
- Frontend: dentro de `front/` execute `npm start`, `npm run build` para produção.

## Observações e dicas

- As credenciais do banco estão em claro no código — considere usar variáveis de ambiente ou um arquivo `.env` e não comitar segredos.
- Se preferir, adicione um script `start` no `back/package.json` para facilitar (`"start": "node index.js"`).
- O Sequelize está configurado para `sync()` no startup — em produção, avalie migrações em vez de `sync()`.

## Contribuição

1. Fork o repositório
2. Crie uma branch com sua alteração: `git checkout -b feature/minha-melhora`
3. Faça commits claros e faça um Pull Request

## Licença

Verifique se há um arquivo de licença no repositório ou adicione uma conforme necessário.

---

Se quiser, eu posso:

- adicionar um `start` script em `back/package.json` para facilitar;
- alterar `back/Banco.js` para ler variáveis de ambiente e adicionar um exemplo de `.env`;
- criar instruções de deploy (Heroku, Railway, Vercel) — diga qual serviço prefere.# Petshop Programação 1 - Sistema de Gerenciamento

Este é um sistema web full-stack desenvolvido para gerenciamento de serviços e atendimentos de um pet shop. O projeto possui um front-end moderno, responsivo e estilizado com foco em uma experiência do usuário (UI/UX) premium, conectado a um back-end estruturado com banco de dados relacional.

---

## Tecnologias Utilizadas

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

## Como Iniciar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js** (v16 ou superior)
- **PostgreSQL** rodando localmente

---

### 1. Configuração do Banco de Dados

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
   _(O padrão configurado é usuário `postgres` e senha `postgres`)_.

---

### 2. Iniciando o Back-end (API)

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
   _Você deverá ver a mensagem: `Servidor rodando na porta 3000`_.

---

### 3. Iniciando o Front-end (React)

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

## Principais Melhorias de UI/UX Implementadas

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

## Autores

- **Lucas Santos Magro** (Desenvolvimento e Integrações)
- **Antigravity** (Assistência no Design UI/UX e Frontend)

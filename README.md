# TechHub App

## Descrição

O **TechHub App** é uma aplicação web que permite a gestão de projetos, incluindo a adição, edição, remoção e listagem de itens armazenados em um banco de dados MongoDB. A aplicação inclui uma API RESTful para realizar operações CRUD e um frontend construído em Angular.

## Funcionalidades

### Backend
- **CRUD de itens**: 
  - Listagem de itens com suporte à paginação e filtros.
  - Contagem do total de itens armazenados.
  - Adição de itens individuais ou em lote.
  - Atualização de itens com base no ID.
  - Exclusão de itens pelo ID.
- **Documentação com Swagger**:
  - A API está documentada utilizando o Swagger para facilitar a compreensão dos endpoints e suas funcionalidades.

### Frontend
- **Gerenciamento de Projetos**:
  - Exibição de itens com paginação e filtros.
  - Busca personalizada por título e descrição.
  - Comunicação com a API para operações CRUD.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Plataforma de execução JavaScript.
- **Express**: Framework para construção da API REST.
- **MongoDB**: Banco de dados NoSQL para armazenar os itens.
- **Swagger**: Documentação interativa da API.
- **dotenv**: Gerenciamento de variáveis de ambiente.

### Frontend
- **Angular**: Framework para construção do frontend.
- **Angular CLI**: Ferramenta de linha de comando para desenvolvimento.
- **PrimeNG**: Biblioteca de componentes visuais.
- **HttpClient**: Comunicação com a API.

## Estrutura do Projeto

```
techhub-app/
│
├── server/
│   ├── db_mongo.js        # Configuração de conexão com MongoDB
│   ├── swagger.js         # Configuração do Swagger
│   ├── server.js          # Arquivo principal do backend
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/  # Serviços Angular para comunicação com a API
│   │   │   ├── components # Componentes Angular
│   │   ├── environments/  # Configurações de ambiente
│
└── dist/                  # Aplicação Angular empacotada
```

## Endpoints da API

| Método | Endpoint              | Descrição                                   |
|--------|-----------------------|---------------------------------------------|
| GET    | `/api/items`          | Lista todos os itens com suporte a filtros e paginação. |
| GET    | `/api/items/count`    | Retorna o total de itens armazenados.       |
| POST   | `/api/items`          | Cria um novo item.                         |
| POST   | `/api/items/bulk`     | Adiciona vários itens de uma vez.           |
| PUT    | `/api/items/:id`      | Atualiza um item existente pelo ID.         |
| DELETE | `/api/items/:id`      | Remove um item pelo ID.                     |

> Para detalhes dos parâmetros e exemplos de resposta, acesse a documentação no [Swagger](http://localhost:3000/api-docs).

## Como Rodar a Aplicação

### Pré-requisitos
- **Node.js** e **npm**
- **MongoDB**
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)

### Configuração

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd techhub-app
   ```

2. Configure o banco de dados MongoDB:
   - Edite o arquivo `db_mongo.js` com a URL do seu banco de dados.

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` no diretório raiz do backend com a seguinte configuração:
     ```
     PORT=3000
     API_URL=http://localhost:3000/api
     ```

### Inicialização do Backend

1. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```

2. Inicie o servidor:
   ```bash
   node server.js
   ```

### Inicialização do Frontend

1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

3. Acesse a aplicação no navegador:
   - URL: `http://localhost:4200`

### Deploy da Aplicação
- Compile o frontend para produção:
  ```bash
  ng build --configuration production
  ```
- O conteúdo gerado estará na pasta `dist/techhub-app/browser`.

## Documentação da API

Acesse a documentação da API no Swagger:
- URL: `http://localhost:3000/api-docs`

## Contato

Caso tenha dúvidas ou sugestões, sinta-se à vontade para abrir uma _issue_ ou enviar uma mensagem. 

--- 

Desenvolvido com 💻 e ☕.
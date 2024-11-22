const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupSwagger = require('./swagger');
const app = express();
setupSwagger(app);
// Verifica o tipo de banco de dados
// const db = require('./db');
const db = require('./db_mongo');

const angularDistPath = path.join(__dirname, '../../dist/techhub-app/browser');
// Middleware
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(angularDistPath));

// Rotas CRUD
/**
 * @swagger
 * /api/items:
 *   get:
 *     tags:
 *      - Projetos
 *     summary: Retorna todos os itens
 *     description: Retorna uma lista de todos os itens armazenados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de itens.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do item.
 *                   title:
 *                     type: string
 *                     description: Título do item.
 *                   description:
 *                     type: string
 *                     description: Descrição do item.
 *                   link_aplication:
 *                     type: string
 *                     description: Link da aplicação associada ao item.
 *                   photo:
 *                     type: string
 *                     description: URL da foto do item.
 */
app.get('/api/items', async (req, res) => {
  try {
    const database = await db.connect();
    const collection = database.collection('items');

    const { first, rows } = req.query;
    const skip = parseInt(first);
    const limit = parseInt(rows);

    const items = await collection.find().skip(skip).limit(limit).toArray();

    res.json(items);
  } catch (err) {
    res.status(500).send('Erro ao buscar itens');
  }
});

app.get('/api/items/count', async (req, res) => {
  try {
    const database = await db.connect();
    const collection = database.collection('items');
    const count = await collection.countDocuments();
    res.json({ total: count });
  } catch (err) {
    res.status(500).send('Erro ao contar itens');
  }
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     tags:
 *      - Projetos
 *     summary: Cria um novo item
 *     description: Adiciona um novo item ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do item.
 *               description:
 *                 type: string
 *                 description: Descrição do item.
 *               link_aplication:
 *                 type: string
 *                 description: Link da aplicação associada ao item.
 *               photo:
 *                 type: string
 *                 description: URL da foto do item.
 *     responses:
 *       201:
 *         description: Item criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do novo item criado.
 *       500:
 *         description: Erro ao criar item.
 */
app.post('/api/items', async (req, res) => {
  const { title, description, link_aplication, photo } = req.body;
  try {
    const database = await db.connect();
    const collection = database.collection('items');
    const result = await collection.insertOne({ title, description, link_aplication, photo });

    // Retornar o item criado
    const newItem = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).send('Erro ao criar item');
  }
});
/**
 * @swagger
 * /api/items/bulk:
 *   post:
 *     tags:
 *      - Projetos
 *     summary: Adiciona vários itens de uma vez
 *     description: Recebe uma lista de itens e os adiciona ao banco de dados, um por um.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Título do item.
 *                 description:
 *                   type: string
 *                   description: Descrição do item.
 *                 link_aplication:
 *                   type: string
 *                   description: Link da aplicação associada ao item.
 *                 photo:
 *                   type: string
 *                   description: URL da foto do item.
 *     responses:
 *       201:
 *         description: Itens adicionados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro ao adicionar itens.
 */
app.post('/api/items/bulk', async (req, res) => {
  const items = req.body; // Deve ser uma lista de itens
  if (!Array.isArray(items)) {
    return res.status(400).send('O corpo da requisição deve ser uma lista de itens');
  }

  try {
    const database = await db.connect();
    const collection = database.collection('items');
    const insertedItems = [];

    // Inserir itens um por um
    for (const item of items) {
      const { title, description, link_aplication, photo } = item;
      const result = await collection.insertOne({ title, description, link_aplication, photo });
      const newItem = await collection.findOne({ _id: result.insertedId });
      insertedItems.push(newItem); // Adiciona o item recém-criado à lista de resposta
    }

    res.status(201).json(insertedItems); // Retorna os itens criados
  } catch (err) {
    console.error('Erro ao criar itens:', err);
    res.status(500).send('Erro ao criar itens');
  }
});

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     tags:
 *      - Projetos
 *     summary: Atualiza um item existente
 *     description: Atualiza os detalhes de um item baseado no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Novo título do item.
 *               description:
 *                 type: string
 *                 description: Nova descrição do item.
 *               link_aplication:
 *                 type: string
 *                 description: Novo link da aplicação associada ao item.
 *               photo:
 *                 type: string
 *                 description: Nova URL da foto do item.
 *     responses:
 *       204:
 *         description: Item atualizado com sucesso.
 *       404:
 *         description: Item não encontrado.
 *       500:
 *         description: Erro ao atualizar item.
 */
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, link_aplication, photo } = req.body;
  try {
    const database = await db.connect();
    const collection = database.collection('items');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, link_aplication, photo } }
    );

    if (result.matchedCount === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.status(204).send(); // Atualizado com sucesso
    }
  } catch (err) {
    res.status(500).send('Erro ao atualizar item');
  }
});
/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     tags:
 *      - Projetos
 *     summary: Remove um item
 *     description: Remove um item baseado no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser removido.
 *     responses:
 *       204:
 *         description: Item removido com sucesso.
 *       404:
 *         description: Item não encontrado.
 *       500:
 *         description: Erro ao excluir item.
 */
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const database = await db.connect();
    const collection = database.collection('items');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.status(204).send(); // Removido com sucesso
    }
  } catch (err) {
    res.status(500).send('Erro ao excluir item');
  }
});

// Redireciona para o Angular
app.get('*', (req, res) => {
  console.log("Path", angularDistPath)
  res.sendFile(path.join(angularDistPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

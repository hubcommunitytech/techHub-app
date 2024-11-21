const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const setupSwagger = require('./swagger');
const app = express();
setupSwagger(app);
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
app.get('/api/items', (req, res) => {
  console.log("Get Items");
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      res.status(500).send('Erro ao buscar itens');
    } else {
      res.json(rows);
    }
  });
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
app.post('/api/items', (req, res) => {
  const { title, description, link_aplication, photo } = req.body;
  db.run(
    `INSERT INTO items (title, description, link_aplication, photo) VALUES (?, ?, ?, ?)`,
    [title, description, link_aplication, photo],
    function (err) {
      if (err) {
        res.status(500).send('Erro ao criar item');
      } else {
        const newItemId = this.lastID;
        // Recuperar o objeto criado
        db.get(
          `SELECT * FROM items WHERE id = ?`,
          [newItemId],
          (err, row) => {
            if (err) {
              res.status(500).send('Erro ao recuperar o item criado');
            } else {
              res.status(201).json(row);
            }
          }
        );
      }
    }
  );
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
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, link_aplication, photo } = req.body;
  db.run(
    `UPDATE items SET title = ?, description = ?, link_aplication = ?, photo = ? WHERE id = ?`,
    [title, description, link_aplication, photo, id],
    function (err) {
      if (err) {
        res.status(500).send('Erro ao atualizar item');
      } else if (this.changes === 0) {
        res.status(404).send('Item não encontrado');
      } else {
        res.status(204).send();
      }
    }
  );
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
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM items WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(500).send('Erro ao excluir item');
    } else if (this.changes === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.status(204).send();
    }
  });
});


// Redireciona para o Angular
app.get('*', (req, res) => {
  console.log("Path", angularDistPath)
  res.sendFile(path.join(angularDistPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

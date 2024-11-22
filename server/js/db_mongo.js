const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const uri = process.env.DB_URL || 'mongodb+srv://hub_db:hub_db@techhub-db.doja6.mongodb.net/?retryWrites=true&w=majority&appName=techhub-db';
// Função para conectar ao MongoDB
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // Conectar ao MongoDB
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso!");
    const db = client.db("techhub");
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
  }
}

// Exportar a função de conexão para ser usada no servidor
module.exports = { connect };

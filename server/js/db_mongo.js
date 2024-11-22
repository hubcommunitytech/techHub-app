const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const uri = process.env.MONGO_URI || 'mongodb+srv://hub_db:hub_db@techhub-db.doja6.mongodb.net/techhub?retryWrites=true&w=majority';
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
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso!");
    const db = client.db("techhub");
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    console.error("Detalhes:", error);
  }
}

// Exportar a função de conexão para ser usada no servidor
module.exports = { connect };

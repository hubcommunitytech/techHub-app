const sqlite3 = require('sqlite3').verbose();

// Criação ou conexão com o banco de dados
const db = new sqlite3.Database('./server/database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      link_aplication TEXT,
      photo TEXT
    )
  `);
});

module.exports = db;

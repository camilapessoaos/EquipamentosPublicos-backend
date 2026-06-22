// db.js
// Configura o banco SQLite e garante que a tabela exista.
// O banco fica salvo num arquivo "banco.db" dentro dessa mesma pasta.

const Database = require('better-sqlite3');

const db = new Database('banco.db');

// Cria a tabela "localizacoes" caso ela ainda não exista.
// Cada linha representa: um usuário (simplificado) marcou que estava perto
// de um determinado equipamento público, numa determinada coordenada.
db.exec(`
  CREATE TABLE IF NOT EXISTS localizacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_equipamento TEXT NOT NULL,
    latitude_usuario REAL NOT NULL,
    longitude_usuario REAL NOT NULL,
    latitude_equipamento REAL,
    longitude_equipamento REAL,
    criado_em TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;
// server.js
// Servidor Express com as duas rotas pedidas no trabalho: um POST e um GET.

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());          // permite chamadas vindas do app no celular
app.use(express.json());  // permite o Express entender JSON no corpo das requisições
app.use((req, res, next) => {
  console.log(`📩 Requisição recebida: ${req.method} ${req.url}`);
  next();
});
// Rota de teste, só pra confirmar que o servidor está de pé
app.get('/', (req, res) => {
  res.send('Backend do Recife Equipamentos Públicos está rodando!');
});

// POST /localizacoes
// Salva a relação: usuário estava em tal coordenada, próximo a tal equipamento.
app.post('/localizacoes', (req, res) => {
  const {
    nome_equipamento,
    latitude_usuario,
    longitude_usuario,
    latitude_equipamento,
    longitude_equipamento,
  } = req.body;

  // Validação simples: campos obrigatórios
  if (!nome_equipamento || latitude_usuario == null || longitude_usuario == null) {
    return res.status(400).json({ erro: 'Dados incompletos.' });
  }

  const stmt = db.prepare(`
    INSERT INTO localizacoes
      (nome_equipamento, latitude_usuario, longitude_usuario, latitude_equipamento, longitude_equipamento)
    VALUES (?, ?, ?, ?, ?)
  `);

  const resultado = stmt.run(
    nome_equipamento,
    latitude_usuario,
    longitude_usuario,
    latitude_equipamento ?? null,
    longitude_equipamento ?? null
  );

  res.status(201).json({ id: resultado.lastInsertRowid, mensagem: 'Localização salva com sucesso!' });
});

// GET /localizacoes
// Retorna todo o histórico salvo, mais recente primeiro.
app.get('/localizacoes', (req, res) => {
  const registros = db.prepare('SELECT * FROM localizacoes ORDER BY id DESC').all();
  res.json(registros);
});

const PORTA = 3000;
app.listen(PORTA, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
# Recife Equipamentos Públicos — Backend

Backend desenvolvido em Node.js com Express, responsável por persistir o relacionamento entre a localização do usuário e os equipamentos públicos consumidos pela API do Dados Recife. Faz parte da atividade final da disciplina.

---

## Funcionalidades

- Rota **POST** para salvar a localização do usuário associada a um equipamento público
- Rota **GET** para listar todo o histórico de localizações salvas
- Banco de dados SQLite local (sem necessidade de configuração externa)

---

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — framework para criação das rotas HTTP
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — banco de dados SQLite
- [cors](https://www.npmjs.com/package/cors) — liberação de requisições vindas do app mobile

---

## Estrutura do projeto

```
recife-equipamentos-backend/
├── server.js        # Servidor Express com as rotas POST e GET
├── db.js            # Configuração do banco SQLite e criação da tabela
├── package.json     # Dependências do projeto
└── banco.db         # Arquivo do banco de dados (gerado automaticamente)
```

---

## Rotas disponíveis

### `GET /`
Rota de verificação — confirma que o servidor está rodando.

**Resposta:**
```
Backend do Recife Equipamentos Públicos está rodando!
```

---

### `POST /localizacoes`
Salva a localização atual do usuário associada a um equipamento público.

**Body (JSON):**
```json
{
  "nome_equipamento": "Teatro de Santa Isabel",
  "latitude_usuario": -8.06310,
  "longitude_usuario": -34.87110,
  "latitude_equipamento": -8.06330,
  "longitude_equipamento": -34.87090
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 1,
  "mensagem": "Localização salva com sucesso!"
}
```

**Resposta de erro (400):**
```json
{
  "erro": "Dados incompletos."
}
```

---

### `GET /localizacoes`
Retorna todos os registros salvos, ordenados do mais recente para o mais antigo.

**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "nome_equipamento": "Teatro de Santa Isabel",
    "latitude_usuario": -8.0631,
    "longitude_usuario": -34.8711,
    "latitude_equipamento": -8.0633,
    "longitude_equipamento": -34.8709,
    "criado_em": "2026-06-22 14:30:00"
  }
]
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- PC e celular na **mesma rede Wi-Fi** (para o app mobile conseguir se comunicar com o backend)

---

## Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/camilapessoaos/EquipamentosPublicos-backend.git 
cd recife-equipamentos-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

```bash
node server.js
```

O servidor vai iniciar na porta **3000**. O arquivo `banco.db` é criado automaticamente na primeira execução.

### 4. Verifique no navegador

Acesse `http://localhost:3000` — deve aparecer a mensagem de confirmação.

Para listar os registros salvos: `http://localhost:3000/localizacoes`

---

## Observações

- O servidor escuta em `0.0.0.0` (todas as interfaces de rede), permitindo que dispositivos na mesma rede Wi-Fi consigam se conectar a ele — necessário para o app mobile funcionar.
- O banco de dados SQLite fica salvo localmente no arquivo `banco.db`. Não é necessário instalar nenhum sistema de banco de dados separado.
- A porta padrão é `3000`. Certifique-se de que o Firewall do Windows permite conexões nessa porta para o Node.js.

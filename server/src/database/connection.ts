import knex from 'knex'; //biblioteca para fazer conexão com o banco de dados 
import path from 'path'; //modulo para buscar os caminhos dos arquvos/pasta

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') //conectar com o bd e criar um arquivo database.sqlite
  },
  useNullAsDefault: true,
});

export default db;
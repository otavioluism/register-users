import Knex from 'knex';

// metodo up a gente faz as tabelas 
export async function up(knex: Knex) { 
  return knex.schema.createTable('users', table => { 
    table.increments('id').primary(); // coluna id que incrementa de um 1 em 1 e é a chave primária da tabela
    table.string('name').notNullable(); // coluna nome do tipo string que não pode ser nulo 
    table.string('avatar').notNullable(); // coluna com endereco da foto que nao pode ser nulo
    table.string('profession').notNullable(); // coluna com a profisso que nao pode ser nula
    table.string('email').notNullable(); // coluna do email tambem nao pode ser nula 
    table.string('whatsapp').notNullable();
  });
}

// metodo down a gente desfaz as tabelas, caso houver algum problema
export async function down(knex: Knex) { 
  return knex.schema.dropTable('users'); // metodo para excluir a tabela inteira 
}
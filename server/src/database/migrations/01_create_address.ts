import Knex from 'knex';

export async function up(knex: Knex) { 
  return knex.schema.createTable('address' ,table => {  // criando tabela para guardar os endereços dos usuarios
    table.increments('id').primary();
    table.string('cep').notNullable(); 
    table.string('logradouro').notNullable();
    table.string('street').notNullable();
    table.string('neighborhood').notNullable();
    table.decimal('number').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();

    //salvar de quem é esse endereço, relacionar com o banco de dados do usuario
    table.integer('user_id') // cria um campo com nome user_id 
         .notNullable()      // nao pode ser nulo
         .references('id')   // vai ser referenciado da coluna id 
         .inTable('users')    // da tabela users
         .onUpdate('CASCADE')  // caso for atualizado o id to usuario na tabela usuarios reflete nessa mesma tabela
         .onDelete('CASCADE');  // caso o usuario for deletado, os endereco desse usuario também sao deletados juntos
          
  }); 
};

export async function down(knex: Knex) { 
  return knex.schema.dropTable('address'); 
}
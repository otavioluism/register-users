import { Request, Response } from 'express';

import db from '../database/connection';

// tipando uma variavel 
interface PropsAddress { 
  cep: string;
  logradouro: string;
  street: string;
  neighborhood: string;
  number: number;
  city: string;
  uf: string;
}

// tipando uma variavel
interface PropsEmail { 
  email: string;
}

export default class ControllerUsers { 

  // metodo index, filtros criados para procurar determinado usuario 
  async index(request: Request, response: Response){ 
    const filter = request.query; 

    try{ 

          // caso haver algum filtro de nome ou email entao faca ou os dois filtros 
    if(filter.name && filter.email){ 
      const filtered = await db('users')
          .where('users.name', '=', filter.name as string )
          .orWhere('users.email', '=', filter.email as string)
          .join('address', 'users.id', '=' ,'user_id');

      return response.status(200).json(filtered);

    }else if(filter.name && !filter.email){ 

      // aplicar o filtro somente para o nome 
      const filtered = await db('users')
          .where('users.name', '=', filter.name as string )
          .join('address', 'users.id', '=' ,'user_id');
          
          
      return response.status(200).json(filtered);

    }else if(!filter.name && filter.email){ 

      // aplicar o filtro somente para o email
      const filtered = await db('users')
          .where('users.email', '=', filter.email as string)
          .join('address', 'users.id', '=' ,'user_id');

          return response.status(200).json(filtered);
   
     }else{ 
       // caso nao tiver filtro 
      const filtered = await db('users')                // metodo que conecta com o banco e busca a tabela
        .join('address', 'users.id', '=' ,'address.user_id') //metodo que junta as duas tabelas pelo seu relacionamento
        .select(['users.*','address.*']);                  //metodo que seleciona as tabelas a serem mostradas
      
      return response.status(200).json(filtered);
     }

    }catch(err){

      return response.status(400).json({error: "Unexpected error while list the tables"})

    }
    
  }
  
  // metodo create, cria um novo usuário, verificando primeiro se o email já esta ou não cadastrado
  async create(request: Request, response: Response) { 
  
    const {
      name, 
      avatar, 
      profession, 
      email, 
      whatsapp, 
      address,
    } = request.body; // pegando os valores repassados pelo front-end desestruturado
  
    // trabalhar com transaction para somente guardar no banco de dados se nenhuma insercao no banco dar erro
    const trx = await db.transaction();
  
    try {   
  
        // retorna um vetor de todos os objetos emails, lista todos
        const vetorObjectEmails = await trx('users').select('email');
  
        // funcao que retorna o primeiro elemento que for satisfeito, caso contrario undefined
        const findEmailEqual = vetorObjectEmails.find((eachEmail: PropsEmail) => eachEmail.email === email);  
        
        // se nao encontrou email igual, insere as informacoes 
        if(!findEmailEqual){ 
  
             // retorna o id de todas as inserções, apoós inserir
             const insetedUsersIds = await trx('users').insert({ // db funcao que recebe a tabela e o metodo para realozar
              name, 
              avatar,
              profession, 
              email,
              whatsapp
            });
    
            // pegando o primeiro id inserido na tabela users 
            const user_id = insetedUsersIds[0];
    
           // percorremos o vetor para caso tiver mais de um endereço ser inserido também
           const insertAddress = address.map((item: PropsAddress) => {
            return { 
              cep: item.cep, 
              logradouro: item.logradouro,
              street: item.street,
              neighborhood: item.neighborhood, 
              number: item.number, 
              city: item.city, 
              uf: item.uf, 
              user_id,
            };
          });
    
            // inserindo informações do endereço dentro da tabela endereço  
          await trx('address').insert(insertAddress)
    
            // somente vai colocar os dados no banco de dados se nenhuma operacao dar errado 
          await trx.commit();
    
          return response.status(201).send();
    
        }else{
          await trx.rollback(); // caso houver um erro de email já cadastrado, desfaz tudo que foi inserido
          return response.status(200).json({error: "Email already is used"});
        }
  
    }catch (err) { 
         // caso houve um erro na hora da insercao, entao essa funcao desfaz as insercoes ja realizadas
        return response.status(400).json({error: "Unexpected error while creating new class"});
    }

  }

  async list(request: Request, response: Response) { 
    
    try{
    // buscando na tabela usuario a quantidade de linhas da coluna id, retorna um vetor com o objeto total
    const quantUsers = await db('users').count('id as quantUsers');
    
    // devolvendo a quantidade de usuarios cadastrados 
    const quantity = quantUsers[0].quantUsers;

    return response.status(200).json({quantity});
    }catch (err){ 

      return response.status(400).json({error: "Unexpected error while creating new class"});

    }
  }

  async delete(request: Request, response: Response) { 
    const { id } = request.params;

    try{
      await db('users')
      .where('users.id', '=', id)
      .del();

      return response.status(200).json({message: 'User deleted with success'});
    }catch(err) { 
      return response.status(400).send();
    }
  }

}
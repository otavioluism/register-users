import express from 'express';

// modulo para roteamento do express
const routes = express.Router(); 

import ControllerUsers from './controllers/ControllerUsers';

// instanciando a classe, para pegar os metodos dentro dela
const controllerUsers = new ControllerUsers();

// rota para criar usuario
routes.post('/users', controllerUsers.create);

// rota para listar usuarios
routes.get('/users', controllerUsers.index);

// rota para listar a quantidade de usuarios na plataforma
routes.get('/connections/users', controllerUsers.list);

// rota para deletar um usuario
routes.delete('/users/:id', controllerUsers.delete);

export default routes;
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();    // chamando funcao express
app.use(cors());          // hablitamos o cors para que enderecos diferentes acessem a API, senao o padrao é somente o mesmo endereco do front com o back

app.use(express.json());  // para que a aplicacao entenda os dados vindos em json 
app.use(routes);         // habilitando as rotas 

app.listen(3333, () => { // fazer a aplicacao ouvir a porta 3333
  console.log('Start server 🚀')
});
import React from 'react'; 
import { useHistory } from 'react-router-dom';

import whastsppIcon from '../../assets/images/whatsapp.svg';

import api from '../../services/api';

import './styles.css';

export interface User { 
  avatar: string;
  cep: string;
  city: string;
  email: string;
  id: number;
  logradouro: string;
  name: string;
  neighborhood: string;
  number: number;
  profession: string;
  street: string;
  uf: string;
  whatsapp: string;
  user_id: number;
}

interface informationsUser { 
  user: User;
}

const UserItem:React.FC<informationsUser> = ({user}) => { 

  const history = useHistory();

  //funcao para deletar um usuario
  async function handleDeleteUser(id: number){
    // fazer funcao par ecluir 
    const response = await api.delete(`/users/${user.user_id}`);

    if(response.data.message){ 
      alert(`Usuário ${user.name} excluído com sucesso`);
      history.push('/'); // apos excluir usuario, retorna para a landing page
    }
  }

  return(
    <article className="user-item">
    <header>
      <img src={user.avatar} alt="Imagem de Perfil"/>
      <div>
        <strong>{user.name}</strong>
        <span>{user.profession}</span>
      </div>
    </header>

    <div className="dados">
      <div>
        <h1>Contato</h1>
        <div className="contatos">
          <h3>E-mail</h3>
          <p>{user.email}</p>
          <h3>Telefone</h3>
          <p>{user.whatsapp}</p>
        </div>
        <h1>Endereço</h1>
        <div className="address">
          <h3>CEP</h3>
          <p>{user.cep}</p>
          <h3>LOGRADOURO</h3>
          <p>{user.logradouro}</p>
          <h3>NÚMERO</h3>
          <p>{user.number}</p>
          <h3>CIDADE</h3>
          <p>{user.city}</p>
          <h3>UF</h3>
          <p>{user.uf}</p>
        </div>
      </div>
    
      <div className="alterar">
        <button className="excluir" onClick={() => handleDeleteUser(user.id)}>Excluir</button>
      </div>
    </div>
    <footer>
    <a href={`tel:${user.whatsapp}`} target="a_blank">
        <img src={whastsppIcon} alt="Icone de Whatsapp"/>
        Ligar
      </a>
      <a  target="a_blank" href={`https://api.whatsapp.com/send?phone=55${user.whatsapp}&text=Oi%20tudo%20bem?`}>
        <img src={whastsppIcon} alt="Icone de Whatsapp"/>
        Whatsapp
      </a>
    </footer>
  </article>
  );
};

export default UserItem;
import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import UserItem, { User } from '../../components/UserItem';
import Input from '../../components/Input';

import ButtonSearch from '../../assets/images/search.svg';

import api from '../../services/api';

import './styles.css';

const UsersList:React.FC = () => { 
  
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 

  async function handleSubmit(e: FormEvent){ 
    e.preventDefault(); // faz com que não tenha eventos do formulario, ou seja, desabilita a restauracao da pagina

    // funcao que ira buscar no banco de dados os usuarios 
    const response = await api.get('/users', {
      params: {
        name,
        email
      }
    });
    
    setUsers(response.data); // vetor de usuarios listados pelo backend
  };

  return(
    <div id="page-user-list" className="container">
      <PageHeader title="Estes são os usuários cadastrados">
        <form id="search-users" onSubmit={handleSubmit}>
          
          <Input name="name" 
                 label="Nome" 
                 value={name} 
                 onChange={e => setName(e.target.value)} 
          />

          <Input name="email" 
                 label="E-mail" 
                 value={email} 
                 onChange={e => setEmail(e.target.value)}
          />
          
          <button type="submit">
            <img src={ButtonSearch} alt="Search"/>
          </button>

        </form>
      </PageHeader>

      <main>
        {users.map((item: User) => {
          return(
            <UserItem key={item.id} user={item}/>  
          )
        })}
      </main>
    </div>
  )
}

export default UsersList;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import iconCadastrar from '../../assets/images/plus-circle.svg';
import iconList from '../../assets/images/list.svg';
import iconUser from '../../assets/images/users.svg';

import schedule from '../../assets/images/schedule.svg';

import api from '../../services/api';

import './styles.css';

const Landing: React.FC = () => { 
  const [quantUsers, setQuantUsers] = useState<number>(0);

useEffect(() => {
  api.get('/connections/users').then(response => { 
    const { quantity } = response.data;
    setQuantUsers(quantity);
  });
}, []);

  return(
    <div id="page-landing">
      <div id="page-landing-content" className="container">
       
        <div className="logo-container">
          <img src={schedule} alt="Schedule"/>
          <h2>Sua plataforma para cadastrar novos usuários</h2>
        </div>

        <div className="buttons-container">
          <Link to="/new" className="cadastrar">
            <img src={iconCadastrar} alt="Icon Cadastrar"/>
            Cadastrar
          </Link>
          <Link to="/list" className="listar">
            <img src={iconList} alt="Icon Listar"/>
            Listar
          </Link>
        </div>

        <span className="total-connections">
          Total de {quantUsers} usuários cadastrados <img src={iconUser} alt="Icon Usuários"/>
        </span>

      </div>
    </div>
  );
}

  export default Landing;
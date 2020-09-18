import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/skip-back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface PropsPageHeader { 
  title: string;
  description?: string;
}
 
const PageHeader:React.FC<PropsPageHeader> = ({ title, children, description }) => { 
  return(
    <header className="page-header">
      
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar Botao"/>
        </Link>
        <img src={logoImg} alt="Logo Empresa"/>
      </div>
      
      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        
        {children}
      </div>
      
  </header>
  );
};

export default PageHeader;
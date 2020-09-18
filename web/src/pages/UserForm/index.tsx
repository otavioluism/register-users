import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

import warningImg from '../../assets/images/alert-octagon.svg';

import api from '../../services/api';

import './styles.css';

const UserForm:React.FC = () => { 
  // variavel para fazer um link sem apertar nele próprio
  const history = useHistory();

  // estado para adicionar nove endereço
  const [newAddress, setNewAddress] = useState([
      { cep: '', logradouro: '', street: '', neighborhood: '', number: 0, city: '', uf: '' }
  ]);

  // estado para capturar o que foi digitado pelo usuario nos formularios
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // funcao chamada quando dado o submit no botao novo endereço
  function newHandleAddress() { 
    setNewAddress([
      ...newAddress, { cep: '', logradouro: '', street: '', neighborhood: '', number: 80, city: '', uf: '' }
    ]);
  };

  // funcao que é chamada apos dar o submit no formulario
  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault(); //faz com que a pagina nao seja recarregada assim que der o submit no formulario

    try {
      if(name !== "" && email !== "" && avatar !== "" && whatsapp !== ""){ // só cadastra se tiver nome, avatar e email
          const response = await api.post('./users', {
            name,
            avatar,
            profession, 
            email,
            whatsapp,
            address: newAddress
          });
          
          if(response.data.error){ 
            alert('Email já cadastrado!');
          }else{
            alert('Cadastro realizado com sucesso!')
            history.push('/'); // depois de cadastratado, redireciona para a pagina landing
          }

        }else{
          alert('Preencha pelo menos os campos Name, Avatar, Email e Whatsapp')
        }
    }catch(err) { 
      alert('Erro no cadastro!');
    }
  }

  // funcao para susbstituir o valor dos campo endereco, por ser de um formato string
  function setAdressItemValue(position: number, field: string, value: string){
    const updateAddressItem = newAddress.map((item, index) => { 
      if(index === position) { //verifica as duas posicoes a do JSX e a do vetor, caso match entao
        return {...item, [field]: value }; //retorna o mesmo valor, apenas mudando com seu seguinte nome do campo, com o valor passado na funcao
      }

      return item;
    });

    setNewAddress(updateAddressItem);
  }

  return(
    <div id="page-user-form" className="container">
      <PageHeader title="Cadastre-se na nossa agenda de contatos" description="Preencha todos os campos" />
      
      <main>
        <form onSubmit={handleSubmitForm}>
          <fieldset>
            <legend>Informações pessoais</legend>

            <Input name="name" 
                   label="Nome Completo" 
                   value={name} 
                   onChange={(e) => { setName(e.target.value) }} 
            />

            <Input name="avatar" 
                   label="Avatar" 
                   placeholder="Endereço de imagem ex:GitHub" 
                   value={avatar} onChange={(e) => { setAvatar(e.target.value) }}
            />

            <Input name="profession" 
                   label="Profissão" 
                   value={profession} onChange={(e) => { setProfession(e.target.value) }} 
            />

            <Input name="email" 
                   label="E-mail" 
                   type="email" 
                   value={email} 
                   onChange={(e) => { setEmail(e.target.value) }} 
            />

            <Input name="whatsapp" 
                   label="Whatsapp" 
                   value={whatsapp} 
                   onChange={(e) => { setWhatsapp(e.target.value) }} 
            />

          </fieldset>

          <fieldset>
            <legend>
              Endereço
              <button type="button" onClick={newHandleAddress}>+ Novo</button>
            </legend>

            {newAddress.map((item, index) => { 
              return(
                  <div key={item.number} className="address-item">
                    
                    <Input name="cep" 
                           label="CEP" 
                           value={item.cep} 
                           onChange={e => setAdressItemValue(index, 'cep', e.target.value)}
                    />

                    <Input name="logradouro" 
                           label="Logradouro" 
                           value={item.logradouro} 
                           onChange={e => setAdressItemValue(index, 'logradouro', e.target.value)} 
                    />

                    <Input name="street" 
                           label="Rua" 
                           value={item.street} 
                           onChange={e => setAdressItemValue(index, 'street', e.target.value)} 
                    />

                    <Input name="neighborhood" 
                           label="Bairro" 
                           value={item.neighborhood} 
                           onChange={e => setAdressItemValue(index, 'neighborhood', e.target.value)} 
                    />

                    <Input name="number" 
                           label="Número" 
                           value={item.number} 
                           onChange={e => setAdressItemValue(index, 'number', e.target.value)}
                    />

                    <Input name="city" 
                           label="Cidade" 
                           value={item.city} 
                           onChange={e => setAdressItemValue(index, 'city', e.target.value)}
                    />

                    <Select 
                      name="uf" 
                      label="UF" 
                      value={item.uf}
                      onChange={e => setAdressItemValue(index, 'uf', e.target.value)}
                      options={[
                        { value:'AC', label:'AC' },
                        { value:'AL', label:'AL' },
                        { value:'AP', label:'AP' },
                        { value:'AM', label:'AM' },
                        { value:'BA', label:'BA' },
                        { value:'CE', label:'CE' },
                        { value:'ES', label:'ES' },
                        { value:'GO', label:'GO' },
                        { value:'MA', label:'MA' },
                        { value:'MT', label:'MT' },
                        { value:'MS', label:'MS' },
                        { value:'MG', label:'MG' },
                        { value:'PA', label:'PA' },
                        { value:'PB', label:'PB' },
                        { value:'PR', label:'PR' },
                        { value:'PE', label:'PE' },
                        { value:'PI', label:'PI' },
                        { value:'RJ', label:'RJ' },
                        { value:'RN', label:'RN' },
                        { value:'RS', label:'RS' },
                        { value:'RO', label:'RO' },
                        { value:'RR', label:'RR' },
                        { value:'SC', label:'SC' },
                        { value:'SP', label:'SP' },
                        { value:'SE', label:'SE' },
                        { value:'TO', label:'TO' },
                        { value:'DF', label:'DF' },
                      ]}
                    />
                  </div>
                );
              })}
              
          </fieldset>

          <footer>
              <p>
                <img src={warningImg} alt="Aviso Importante"/>
                Importante <br /> 
                Preencha todos os dados
              </p>
              <button type="submit">Salvar cadastro</button>
         </footer>
        </form>
      </main>
  </div>
  );
}

export default UserForm;
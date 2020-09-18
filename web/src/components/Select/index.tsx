import React, { SelectHTMLAttributes } from 'react'; 

import './styles.css';

interface PropsSelect extends SelectHTMLAttributes<HTMLSelectElement> { 
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select:React.FC<PropsSelect> = ({name, label, options ,...rest}) => { 
  return(
    <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select id={name} value="" {...rest} >

      <option value="" hidden >Selecione uma opção</option>

      {options.map(item => { 
        return (
          <option key={item.value} value={item.value}>{item.label}</option>
        )
      })}

    </select>
  </div>
  );
}

export default Select;
import React from 'react';


const SelectBox = props => {   

  let label = "";  
  let selectStyle = "";

  if(props.show === "false"){
    selectStyle = {
      display : "none"
    };
  }else{
    selectStyle = {
      display : "block"
    };
  }
  

  if(props.label){
    label = <label style={selectStyle} htmlFor={props.component_name}>{props.label}</label>        
    if(props.strong){                
        label = <label style={selectStyle} htmlFor={props.component_name}><strong>{props.label}</strong></label>
    }
  } 

  return(
    <div>       
       {label} 
        <select style={selectStyle} name={props.component_name} onChange={(event) => props.change(event,props.component_name)} className="form-control">
            <option value=""></option>            
            {props.data.map(data =>                             
                (parseInt(data.id) === parseInt(props.selected_value))?<option selected {...data.extra} value={data.id} >{data[props.value]}</option>:<option value={data.id} {...data.extra}>{data[props.value]}</option>                                     
            )}        
        </select>
    </div>
  );
}

export default SelectBox;
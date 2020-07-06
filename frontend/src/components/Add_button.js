import React from 'react';
import {Link} from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import './index.css'


const AddButton = props => {    
    // console.log(props.url)
    // console.log(props.classname)
        return(
            <div>
                <Link to={props.url} className="btn-default-add">
                    <FiPlus size={24} style={{color:"#fff", marginTop:"11px", marginLeft:"14px"}}/>
                </Link>
            </div>
        );    
}

export default AddButton;
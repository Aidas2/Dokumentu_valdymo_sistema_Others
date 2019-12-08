import React from 'react';
import {Link } from "react-router-dom";
import { Button } from 'antd';
import 'antd/dist/antd.css';

    
const userComponent = (props) => { 

    return(    
    <tr>
        <td>{props.name}</td>
        <td>{props.surname}</td>
        <td>{props.email}</td>
        {/* <td>{props.type}</td> */}
        <td>
        <Link to={`/vartotojas/${props.email}`}>
        <Button type="primary">
            Peržiūrėti 
        </Button>
        </Link>
        </td>
        <td>
        <Link to={`/redaguoti/vartotojas/${props.email}`}>
        <Button type="default">
         Redaguoti
        </Button>
        </Link>
    </td>
    </tr>
   
    )
}
export default userComponent

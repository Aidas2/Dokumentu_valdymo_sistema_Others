import React from 'react';
import UserComponent from './UserComponent';

const userListComponent = (props) => {
    console.log(props)
    
    var UserList = props.users.map((user)=> {
        return(
             <UserComponent 
             key={user.email}
             name={user.name}
             surname={user.surname}
             email={user.email}
            //  type = {user.type.title}
             />  
        );
        
     });
     
      return(
       <tbody>
           {UserList}
       </tbody>
      )
  
      }
export default userListComponent;
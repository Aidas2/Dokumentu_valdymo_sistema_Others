import React, { Component } from 'react';
import InstructionsAdmin from './InstructionsAdmin'
import UserInstructions from './UserInstructions';

const Instructions = (props) => (
  
    <div id="instructions">
    {props.currentUser.admin && 
    <InstructionsAdmin/>
    }
    <UserInstructions/>
    </div>
      );
      
    export default Instructions; 
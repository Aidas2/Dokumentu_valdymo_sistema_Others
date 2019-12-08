import React, { Component } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
        email: '',
        isAuthenticated: false
    }
    console.log("Props in userprovider", this.props)
  }
  
  render()  {
    return (
      <div>
          {/* defines context state=username and passes to children */}
        <UserContext.Provider 
        value={this.state.email}
        // value={{ isAuthenticated: this.state.isAuthenticated }}
        > 
            {this.props.children}
        </UserContext.Provider>
      </div>
    )
  }
}

const UserConsumer = UserContext.Consumer

export default {UserProvider, UserConsumer}

import React from 'react';
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { isAuth: false }
    render() {
      return (
        <AuthContext.Provider
          value={{ isAuth: this.state.isAuth }}
        >
          {this.props.children}
        </AuthContext.Provider>
      )
    }
  }
  const AuthConsumer = AuthContext.Consumer
  export { AuthProvider, AuthConsumer }
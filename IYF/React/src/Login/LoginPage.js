import React from "react";
import Login from "./Login";
import docImg from '../Images/Documents.png'

class LoginPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          user_name: "",
          password: ""
      }
  }

  componentDidMount = () => {
      this.props.history.push("/");
  }

    render() {
    return (
      <div className="Container">
        <div className="pr-lg-5">
          <img src={docImg} alt="" />
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginPage;

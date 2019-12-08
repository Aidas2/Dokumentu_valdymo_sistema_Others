import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Error from "./components/Error";
import Docs from "./components/RoleUser/Documents/DocumentsList/DocumentsPage";
import NewDocument from "./components/RoleUser/Documents/NewDocument/NewDocument";
import Types from "./components/RoleUser/Documents/Types/TypePage";
import Paperbase from "./components/Header/Paperbase";
import { Container } from "reactstrap";
import GroupPage from "./components/RoleAdmin/Users/Groups/GroupPage";
import UserPage from "./components/RoleAdmin/Users/Users.js/UserPage";
import CreateUserPage from "./components/RoleAdmin/Users/CreateUser/CreateUserPage";
import Admin from "./components/RoleAdmin/AdminHome";
import User from "./components/RoleUser/UserHomePage/UserHome";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import DetailedDocument from "./components/RoleUser/Documents/DocumentsList/DetailedDocument"
import SubmittedDocs from "./components/RoleUser/Documents/DocumentsList/Submitted/DocumentSubmittedPage"
import AcceptedDocs from "./components/RoleUser/Documents/DocumentsList/Accepted/DocumentsAcceptedPage"
import RefusedDocs from "./components/RoleUser/Documents/DocumentsList/Refused/DocumentRefusedPage"
import DocumentEdit from "./components/RoleUser/Documents/DocumentEdit/DocumentEdit";

// function loggedIn() {
//   // ...
// }
// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: "/login"
//     });
//   }
// }

class App extends Component {

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Home} />
        <Route render = {()=>(
          <div>
          <div >
              <Header onDrawerToggle={this.handleDrawerToggle} />
            <div style={{display: "flex"}}>
              <Paperbase />
              <Container>
                  <Switch>
                    <Route path="/" component={User} exact />
                    {/* <Route component={EnsureLoggedInContainer}> */}
                    <Route path="/home-admin" component={Admin} />
                    <Route path="/home-user" component={User} />
                    <Route path="/users" component={UserPage} />
                    <Route path="/create-user" component={CreateUserPage} />
                    <Route path="/documents" component={Docs} />
                    <Route path="/document-edit" component={DocumentEdit} />
                    <Route path="/submitted-documents" component={SubmittedDocs} />
                    <Route path="/accepted-documents" component={AcceptedDocs} />
                    <Route path="/refused-documents" component={RefusedDocs} />
                    <Route path="/create-new-document" component={NewDocument} />
                    <Route path="/types" component={Types} />
                    <Route path="/groups" component={GroupPage} />
                      <Route path="/detailed-document" component={DetailedDocument} />
                    <Route component={Error} />
                    {/* </Route> */}
                    {/* </Route> */}
                  </Switch>
                
                {/* <Route render={props => (
                  localStorage.getItem('user')
                    ? (<Switch>
                      <Route path="/" component={User} exact /> */}
                      {/* <Route component={EnsureLoggedInContainer}> */}
                      {/* <Route path="/home-admin" component={Admin} />
                      <Route path="/home-user" component={User} />
                      <Route path="/users" component={UserPage} />
                      <Route path="/create-user" component={CreateUserPage} />
                      <Route path="/documents" component={Docs} />
                      <Route path="/create-new-document" component={NewDocument} />
                      <Route path="/types" component={Types} /> */}
                      {/* <Route path="/groups" component={GroupPage} /> */}
                      {/* <Route component={Error} /> */}
                      {/* </Route> */}
                      {/* </Route> */}
                    {/* </Switch>) */}
                     {/* : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
               )} /> */}


              </Container>
          
              </div>
            </div>
              <Footer />
            </div>
        )}/>
        </Switch>
      </BrowserRouter>
    );

  }
}

export default App;

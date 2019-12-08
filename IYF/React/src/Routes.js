import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
// import About from "./components/About";
import Error from "./components/Error";
// import Navigation from "./components/Navigation";
import Docs from "./components/RoleUser/Documents/DocumentsList/DocumentsPage";
import NewDocument from "./components/RoleUser/Documents/DocumentsList/NewDocument/NewDocument";
import Types from "./components/RoleUser/Documents/Types/TypePage";
import Paperbase from "./components/Header/Paperbase";
// import Navi from './components/Navi';

import { Container } from "reactstrap";
import GroupPage from "./components/RoleAdmin/Users/Groups/GroupPage";
import UserPage from "./components/RoleAdmin/Users/Users.js/UserPage";
import CreateUserPage from "./components/RoleAdmin/Users/CreateUser/CreateUserPage";
// import Login from "./components/Login";
import Admin from "./components/RoleAdmin/AdminHome";
import User from "./components/RoleUser/UserHome";
import LoginPage from "./Login/LoginPage";
// import EnsureLoggedInContainer from "./components/Authentication/EnsureLoggedInContainer";
// import NavBarSide from './components/SideBar/NavBarSide'
// import Root from "./Root";
// import history from "./history";

function loggedIn() {
    // ...
}

function requireAuth(nextState, replace) {
    if (!loggedIn()) {
        replace({
            pathname: "/login"
        });
    }
}

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Paperbase />
                    <Container>
                        {/* <Navigation /> */}
                        {/* <NavBarSide /> */}
                        {/* <Navi /> */}
                        <Switch>
                            <Route path="/" component={LoginPage} exact />
                            {/* <Route component={EnsureLoggedInContainer}> */}
                            <Route path="/home-admin" component={Admin} />
                            <Route path="/home-user" component={User} />
                            <Route path="/users" component={UserPage} />
                            <Route path="/create-user" component={CreateUserPage} />
                            <Route path="/documents" component={Docs} />
                            <Route path="/create-new-document" component={NewDocument} />
                            <Route path="/types" component={Types} />
                            <Route path="/groups" component={GroupPage} />
                            <Route component={Error} />
                            {/* </Route> */}
                            {/* </Route> */}
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
            





            // <BrowserRouter>
            //     <Switch>
            //         <Route path="/login" component={Home} />
            //         <Route render={() => (
            //             <div >
            //                 <Header onDrawerToggle={this.handleDrawerToggle} />
            //                 <div style={{ display: "flex" }}>
            //                     <Paperbase />
            //                     <Container>
            //                         {/* <Navigation /> */}
            //                         {/* <NavBarSide /> */}
            //                         {/* <Navi /> */}
            //                         <Route render={props => (
            //                             localStorage.getItem('user')
            //                                 ? (<Switch>
            //                                     <Route path="/" component={User} exact />
            //                                     {/* <Route component={EnsureLoggedInContainer}> */}
            //                                     <Route path="/home-admin" component={Admin} />
            //                                     <Route path="/home-user" component={User} />
            //                                     <Route path="/users" component={UserPage} />
            //                                     <Route path="/create-user" component={CreateUserPage} />
            //                                     <Route path="/documents" component={Docs} />
            //                                     <Route path="/create-new-document" component={NewDocument} />
            //                                     <Route path="/types" component={Types} />
            //                                     <Route path="/groups" component={GroupPage} />
            //                                     <Route component={Error} />
            //                                     {/* </Route> */}
            //                                     {/* </Route> */}
            //                                 </Switch>)
            //                                 : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            //                         )} />
            //                     </Container>
            //                 </div>
            //             </div>
            //         )} />
            //     </Switch>
            // </BrowserRouter>
    }
}

export default Routes;


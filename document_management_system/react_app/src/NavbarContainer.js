
import React, { Component } from 'react';
import './index.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import { Redirect } from 'react-router'

import { getCurrentUser, getReceivedDocuments } from './security/apiUtil';
import { ACCESS_TOKEN } from './index';
import './index.css';
import axios from 'axios';
import Login from './security/Login';
import TypeForm from './Form/TypeFormContainer';
import DocumentList, { DocumentListContainer } from './DocumentListContainer';
import LoadingIndicator from './layout/LoadingIndicator'
import PrivateRoute from './security/PrivateRoute';
import UserGroupFormContainer from './Form/UserGroupFormContainer';
import { Layout, notification } from 'antd';
import SingleUser from './SingleUser';
import Registration from './Form/Registration';
import HomePage from './HomePage';
import SingleGroup from './SingleGroup';
import Navbar from './Navbar'
import EditGroup from './Form/edit/EditGroup';
import SingleType from './SingleType';
import EditType from './Form/edit/EditType';
import UserListContainer from './UserListContainer'
import Form from './Form/FormComponent';
import EditDocument from './Form/edit/EditDocument';
import SingleDocument from './SingleDocument';
import Nowhere from './layout/Nowhere';
import UserDocumentListContainer from './UserDocumentListContainer';
import SingleReceivedDocument from './SingleReceivedDocument';
import ReceivedUserDocuments, { DocumentContext } from './ReceivedUserDocuments';
import GroupListContainer from './GroupListContainer';
import TypeListContainer from './TypeListContainer';
import AdminRoute from './security/AdminRoute';
import EditUser from './Form/edit/EditUser';
import UserVerticalMenu from './layout/UserVerticalMenu';
import UsersTable from './UsersTable';
import UserDocumentTable from './UserDocumentTable';
import ReceivedDocumentsTable from './ReceivedDocumentsTable';
import UserGroupStatistics from './Form/UserGroupStatistics';
import Instructions from './layout/Instructions';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false
    }

    console.log("received" , this.state.receivedDocuments )

    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
        console.log("User reposne", response)
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: response.admin,
        email: response.email
      });
    
    }).catch(error => {
        console.log("Error in getuser", error)
      this.setState({
        isLoading: false
      });  
    });
  }
  
  componentDidMount() {
    this.loadCurrentUser();
  }
  
  // Handle Logout, Set currentUser and isAuthenticated state which will be passed to other components
  handleLogout(redirectTo="/", notificationType="success", description="Atsijungimas sėkmingas.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false,
      isAdmin:false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
      description: description,
    });
  }

  /* 
   This method is called by the Login component after successful login 
   so that we can load the logged-in user details and set the currentUser &
   isAuthenticated state, which other components will use to render their JSX
  */
  handleLogin() {
    notification.success({
      message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
      description: "Prisijungimas sėkmingas.",
    });
    this.loadCurrentUser();
    this.props.history.push("/pagrindinis");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    const {isAuthenticated, isAdmin} =this.state
    return (
        <Layout className="app-container" id="app-container">
            {(this.state.isAuthenticated) ?
          <Navbar isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} /> :
            <span></span>}   
            {(this.state.isAuthenticated) ?
            <UserVerticalMenu isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} /> :
            <span></span>}   
              <Content className="app-content">
                <div className="container">
              
              <Switch>  
              <Route exact path="/" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
               {/* <Route path='/pagrindinis' render={(props) => <HomePage isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>         */}
                <PrivateRoute path='/pagrindinis' component={HomePage} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} />
                <PrivateRoute path='/informacija' component={Instructions} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser}/>
                <PrivateRoute path="/naujas-dokumentas" component={Form} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} />}/>
                <PrivateRoute path="/dokumentas/:number" component={SingleDocument} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} />}/> 
                <PrivateRoute path="/gautas/dokumentas/:number" component={SingleReceivedDocument} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} />}/> 
                <PrivateRoute path="/redaguoti/dokumentas/:number" component={EditDocument} isAuthenticated={isAuthenticated} />
                <PrivateRoute path="/mano-dokumentai" component={UserDocumentListContainer} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser}/>
                <PrivateRoute path="/gauti/dokumentai" component={ReceivedDocumentsTable} isAuthenticated={isAuthenticated}  currentUser={this.state.currentUser} />
                <PrivateRoute path="/:email/dokumentai" component={UserDocumentTable} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser}/>            
                <AdminRoute path="/naujas-tipas" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={TypeForm}/>
                <AdminRoute path='/visi-tipai' isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={TypeListContainer}/>
                <AdminRoute path="/tipas/:title" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={SingleType}/>}/>                 
                <AdminRoute path="/redaguoti/tipas/:title" component={EditType} isAdmin={isAdmin} isAuthenticated={isAuthenticated}/> }/>              
                <PrivateRoute path='/siusti/vartotojas/:email/' component={UserDocumentListContainer} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser}/>
                <AdminRoute path='/visi-dokumentai' isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={DocumentListContainer}/>
                <AdminRoute path="/naujas-vartotojas" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={Registration}/>
                <AdminRoute path="/nauja-grupe" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={UserGroupFormContainer}/>
                <AdminRoute path='/visos-grupes' isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={GroupListContainer}/>
                <AdminRoute path="/grupe/:name" isAdmin={isAdmin} isAuthenticated={isAuthenticated}  component={SingleGroup}/> 
                <AdminRoute path="/redaguoti/grupe/:name" component={EditGroup} isAdmin={isAdmin} isAuthenticated={isAuthenticated} /> 
                <AdminRoute path="/vartotojai" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={UsersTable}/>
                <AdminRoute path="/redaguoti/vartotojas/:email" component={EditUser} isAdmin={isAdmin} isAuthenticated={isAuthenticated}/> 
                <AdminRoute path="/vartotojai" isAdmin={isAdmin} isAuthenticated={isAuthenticated} component={UserListContainer}/>
                <PrivateRoute path="/vartotojas/:email" component={SingleUser} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser}/>
                <PrivateRoute path='/:email/statistika'  component={UserGroupStatistics} isAuthenticated={isAuthenticated} currentUser={this.state.currentUser} />
                <Route path="*" component={Nowhere}/>  
              </Switch>
              </div>
          </Content>
          {/* <Footer/> */}
        </Layout>
    );
   
  }
}

export default withRouter(App);
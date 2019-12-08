import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../../UserDocuments/OneSubmittedDocumentContainer";
import NewDocumentContainer from "../../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../../CreateEditDocument/EditDocumentContainer";
import ResourceNotFoundCompoentn from "../../../Errors/ResourceNotFoundComponent";
import Axios from "axios";
import NavigationComponent from "../../NavigationComponent";
import ResponseMessage from "../../../Utilities/ResponseMessage";
import Profile from "../../Profile";
import About from "../../About/About";
export default class UserNavigationSubmitContainer extends Component {
  checkToken = () => {
    let token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      Axios.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      localStorage.clear("user");
      localStorage.clear("accessToken");
      delete Axios.defaults.headers.Authorization;
      this.props.history.push("/login");
    }
  };

  render() {
    this.checkToken();
    return (
      <BrowserRouter>
        <NavigationComponent
          navigation={[
            {
              to: "/newDocument",
              name: "Naujas dokumentas",
              icon: "fas fa-file-signature  mr-3 text-gray blue"
            },
            {
              topTab: {
                title: "Dokumentų pateikimas",
                icon: "far fa-address-book mr-2 text-gray blue"
              },
              to: "/",
              name: "Pateikti dokumentai",
              icon: "fas fa-file-alt mr-3 text-gray blue"
            },
            {
              to: "/createdDocuments",
              name: "Sukurti dokumentai",
              icon: "fas fa-file mr-3 text-gray blue"
            },

            {
              bottomTab: "true",
              to: "",
              name: "Archyvų atsisiuntimas",
              icon: "fas fa-copy mr-3 text-gray blue",
              type: "dropdown"
            },
            {
              to: "/about",
              name: "Apie",
              icon: "fas fa-question-circle ml-1 text-gray blue"
            }
          ]}
          {...this.props}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <ResponseMessage>
                  <UserSubmittedDocumentsContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/about"
              render={props => (
                <ResponseMessage>
                  <About {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/createdDocuments"
              render={props => (
                <ResponseMessage>
                  <UserCreatedDocumentsContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/createdDocuments/:documentId"
              render={props => (
                <ResponseMessage>
                  <OneCreatedDocumentsContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/submittedDocuments/:documentId"
              render={props => (
                <ResponseMessage>
                  <OneSubmittedDocumentsContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/admin/newDocument"
              render={props => (
                <ResponseMessage>
                  <NewDocumentContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/newDocument"
              render={props => (
                <ResponseMessage>
                  <NewDocumentContainer {...props} />
                </ResponseMessage>
              )}
            />
            <Route
              exact
              path="/admin/Documents/:documentId"
              render={props => (
                <ResponseMessage>
                  <EditDocumentContainer {...props} />
                </ResponseMessage>
              )}
            />

            <Route
              path="/user/profile"
              render={props => (
                <ResponseMessage>
                  <Profile {...props} />
                </ResponseMessage>
              )}
              exact
            />

            <Route path="*" component={ResourceNotFoundCompoentn} />
            <Route component={ResourceNotFoundCompoentn} />
          </Switch>
        </NavigationComponent>
      </BrowserRouter>
    );
  }
}

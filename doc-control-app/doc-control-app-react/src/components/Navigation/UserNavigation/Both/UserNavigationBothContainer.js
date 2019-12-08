import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserSubmittedDocumentsContainer from "../../../UserDocuments/UserSubmittedDocumentsContainer";
import UserCreatedDocumentsContainer from "../../../UserDocuments/UserCreatedDocumentsContainer";
import OneCreatedDocumentsContainer from "../../../UserDocuments/OneCreatedDocumentContainer";
import OneSubmittedDocumentsContainer from "../../../UserDocuments/OneSubmittedDocumentContainer";
import ReviewDocumentsContainer from "../../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../../ReviewDocuments/OneReviewDocumentContainer";
import NewDocumentContainer from "../../../CreateEditDocument/NewDocumentContainer";
import EditDocumentContainer from "../../../CreateEditDocument/EditDocumentContainer";
import ResourceNotFoundComponent from "../../../Errors/ResourceNotFoundComponent";
import UserStatisticsContainer from "../../../ReviewDocuments/UserStatisticsContainer";
import DocumentStatisticsContainer from "../../../ReviewDocuments/DocumentStatisticsContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";
import ResponseMessage from "../../../Utilities/ResponseMessage";
import Profile from "../../Profile";
import About from "../../About/About";
import Login from "../../../Authentication/Login";

export default class UserNavigationBothContainer extends Component {
  render() {
    if (checkToken() === false) {
      return <Login />;
    }

    return (
      <div>
        <BrowserRouter>
          <div>
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
                  name: "Archyvų atsisiuntimas",
                  icon: "fas fa-copy mr-3 text-gray blue",
                  type: "dropdown"
                },
                {
                  topTab: {
                    title: "Dokumentų peržiūra",
                    icon: "far fa-address-book mr-2 text-gray blue"
                  },
                  to: "/reviewDocuments",
                  name: "Dokumentai peržiūrai",
                  icon: "fas fa-file-contract  mr-3 text-gray blue"
                },
                {
                  to: "/documentStatistics",
                  name: "Dokumentų statistika",
                  icon: "fas fa-chart-pie mr-3 text-gray blue"
                },
                {
                  bottomTab: "true",
                  to: "/userStatistics",
                  name: "Vartotojų statistika",
                  icon: "fas fa-chart-line mr-3 text-gray blue"
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
                />{" "}
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
                z
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
                  path="/reviewDocuments"
                  render={props => (
                    <ResponseMessage>
                      <ReviewDocumentsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/reviewDocuments/:documentId"
                  render={props => (
                    <ResponseMessage>
                      <OneReviewDocumentsContainer {...props} />
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
                  exact
                  path="/documentStatistics"
                  render={props => (
                    <ResponseMessage>
                      <DocumentStatisticsContainer {...props} />
                    </ResponseMessage>
                  )}
                />
                <Route
                  exact
                  path="/userStatistics"
                  render={props => (
                    <ResponseMessage>
                      <UserStatisticsContainer {...props} />
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
                <Route path="*" component={ResourceNotFoundComponent} />
                <Route component={ResourceNotFoundComponent} />
              </Switch>
            </NavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

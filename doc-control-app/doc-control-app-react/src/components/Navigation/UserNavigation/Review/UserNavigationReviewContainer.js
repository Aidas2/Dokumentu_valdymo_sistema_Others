import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ReviewDocumentsContainer from "../../../ReviewDocuments/ReviewDocumentsContainer";
import OneReviewDocumentsContainer from "../../../ReviewDocuments/OneReviewDocumentContainer";
import ResourceNotFoundComponent from "../../../Errors/ResourceNotFoundComponent";
import DocumentStatisticsContainer from "../../../ReviewDocuments/DocumentStatisticsContainer";
import UserStatisticsContainer from "../../../ReviewDocuments/UserStatisticsContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";
import ResponseMessage from "../../../Utilities/ResponseMessage";
import Profile from "../../Profile";
import About from "../../About/About";
import Login from "../../../Authentication/Login";
export default class UserNavigationReviewContainer extends Component {
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
                  to: "/",
                  name: "Dokumentai peržiūrai",
                  icon: "fas fa-file-alt mr-3 text-gray blue"
                },
                {
                  topTab: {
                    title: "Dokumentų peržiūra",
                    icon: "far fa-address-book mr-2 text-gray blue"
                  },
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
                      <ReviewDocumentsContainer {...props} />
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

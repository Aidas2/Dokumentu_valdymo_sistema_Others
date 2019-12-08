import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UserNoneInformationContainer from "./UserNoneInformationContainer";
import { checkToken } from "../../../Utilities/CheckToken";
import NavigationComponent from "../../NavigationComponent";
import Profile from "../../Profile";
import ResponseMessage from "../../../Utilities/ResponseMessage";
import Login from "../../../Authentication/Login";

export default class UserNavigationNoneContainer extends Component {
  render() {
    if (checkToken() === false) {
      return <Login />;
    }
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavigationComponent navigation={[]} {...this.props}>
              <Switch>
                <Route path="*" component={UserNoneInformationContainer} />
                <Route component={UserNoneInformationContainer} />
                <Route
                  path="/user/profile"
                  render={props => (
                    <ResponseMessage>
                      <Profile {...props} />
                    </ResponseMessage>
                  )}
                  exact
                />
              </Switch>
            </NavigationComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

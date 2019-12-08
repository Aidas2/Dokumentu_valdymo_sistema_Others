// import React, { Component } from "react";
// import LoginContainer from "./LoginContainer";
// import AdminNavigationContainer from "../Navigation/AdminNavigation/AdminNavigationContainer";
// import Axios from "axios";
// import UserNavigationNoneContainer from "../Navigation/UserNavigation/None/UserNavigationNoneContainer";
// import UserNavigationReviewContainer from "../Navigation/UserNavigation/Review/UserNavigationReviewContainer";
// import UserNavigationSubmitContainer from "../Navigation/UserNavigation/Submit/UserNavigationSubmitContainer";
// import UserNavigationBothContainer from "../Navigation/UserNavigation/Both/UserNavigationBothContainer";

// export default class Authentication extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLogged: false,
//             submit: false,
//             review: false
//         };
//     }
//     setLoggedState = () => {
//         this.setState({ isLogged: true });
//         this.getUserGroups();
//     };
//     componentDidMount = () => {
//         this.getUserGroups();
//     };

//     getUserGroups = () => {
//         Axios.get("http://localhost:8081/api/users/action/review")
//             .then(res => {
//                 this.setState({ review: res.data });
//             })
//             .catch(err => console.log(err));
//         Axios.get("http://localhost:8081/api/users/action/submit")
//             .then(res => {
//                 this.setState({ submit: res.data });
//             })
//             .catch(err => console.log(err));
//     };

//     onClickLogoutHandler = () => {
//         this.setState({ isLogged: false });
//         localStorage.clear("user");
//         localStorage.clear("accessToken");
//         delete Axios.defaults.headers.Authorization;
//     };

//     render() {
//         let localData = JSON.parse(localStorage.getItem("user"));
//         // this.getUserGroups();
//         if (localData === null) {
//             return (
//                 <LoginContainer {...this.props} setLoggedState={this.setLoggedState} />
//             );
//         } else if (localData.admin) {
//             return (
//                 <AdminNavigationContainer
//                     {...this.props}
//                     logout={this.onClickLogoutHandler}
//                 />
//             );
//         } else if (this.state.submit === false && this.state.review === false) {
//             return (
//                 <UserNavigationNoneContainer
//                     {...this.props}
//                     logout={this.onClickLogoutHandler}
//                 />
//             );
//         } else if (this.state.submit === false && this.state.review === true) {
//             return (
//                 <UserNavigationReviewContainer
//                     {...this.props}
//                     logout={this.onClickLogoutHandler}
//                 />
//             );
//         } else if (this.state.submit === true && this.state.review === false) {
//             return (
//                 <UserNavigationSubmitContainer
//                     {...this.props}
//                     logout={this.onClickLogoutHandler}
//                 />
//             );
//         } else {
//             return (
//                 <UserNavigationBothContainer
//                     {...this.props}
//                     logout={this.onClickLogoutHandler}
//                 />
//             );
//         }
//     }
// }

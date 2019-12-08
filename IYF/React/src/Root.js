import React, { Component } from "react";
// import { browserHistory } from 'react-router'
// import Admin from "./components/RoleAdmin/AdminHome";
import history from "./history";

export default class Root extends Component{
    componentDidMount = () => {
        //kviest axios, suzinot roota
        //component did mount - kvieciant tik viena karta
        history.push('/Admin')
    }
render () {
    return (
    <div>       
         {this.props.children}
    </div>
    //cia turetu but pagal userio role paskirstyams
        )
    }
}
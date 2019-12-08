import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import SingleUser from './SingleUser';

export class UserHomePage extends Component {
  render() {
    return (
      <div>
      <SingleUser/>
      </div>
    )
  }
}

export default UserHomePage

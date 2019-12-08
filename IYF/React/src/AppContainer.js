import React from 'react';
import { Link } from 'react-router-dom';

const AppContainer = (props) => {
    return (<div>
        <div>
            <Link to='/'>Home</Link> |&nbsp;
            <Link to='/countries'>countries</Link> |&nbsp;
            <Link to='/holidays'>holidays</Link> |&nbsp;
            <Link to='/non-existant'>Non Existant</Link>
        </div>
        {props.children}
    </div>);
};

export default AppContainer;
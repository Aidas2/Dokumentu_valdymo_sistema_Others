import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { notification } from 'antd';
  
  
const AdminRoute = ({ component: Component, isAuthenticated, isAdmin, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && isAdmin ? (
          <Component {...rest} {...props} />
        ) : (
            
          <Redirect
            to={{
              pathname: '/pagrindinis',
            //   state: { from: props.location }
            state: {
                message: notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Atsiprašome prie šito puslapio prieigos neturite!'
                }) 
            }
            }}
          />
          
        )
      }
    />
);
  
export default AdminRoute
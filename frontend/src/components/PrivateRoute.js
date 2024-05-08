import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component,children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const check = isAuthenticated();

  // return (
  //   <Route
  //     {...rest}
  //     element={(props) =>
  //       isAuthenticated ? (
  //         <Component {...props} />
  //       ) : (
  //         <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
  //       )
  //     }
  //   />
  // );
  return check ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
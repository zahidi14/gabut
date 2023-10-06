import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";

// const PrivRoute = ({ component: component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem("token");
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" replace />
//         );
//       }}
//     />
//   );
// };

const PrivRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivRoute;

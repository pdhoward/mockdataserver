import React, { useState, useEffect } from "react";
import Heading from "./components/Layout/Heading/Heading";
import MainContent from "./components/Layout/MainContent/MainContent";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./containers/Login/LoginPage";
import UserService from "./services/UserService";
import { Container } from "semantic-ui-react";
import UpdateCatalogListing from "./containers/Catalog/CatalogListing/UpdateCatalogListing/UpdateCatalogListing";

const App = (props) => {

  const [currentUser, setCurrentUser] = useState(null)
  const userService = new UserService(props.auth);

  useEffect(() => {
    userService.currentUser.subscribe(x =>setCurrentUser(x));
  }, [])
 
 const showRedirect =
    !currentUser && !props.sso ? (
      <Navigate to="/login" />
    ) : null;

    return (
      <Container fluid={true}>
        <Router>
          {showRedirect}
          <Heading userService={userService} />
          {!currentUser && !props.sso && (
            <Routes>
              <Route
                path="/login"
                render={props => <LoginPage userService={userService} />}
              />
            </Routes>
          )}
          {currentUser && (
            <Routes>
              <Route
                path="/add"
                render={props => (
                  <UpdateCatalogListing
                    {...props}
                    user={currentUser}
                  />
                )}
              />
              <Route
                path="/edit"
                render={props => (
                  <UpdateCatalogListing
                    {...props}
                    user={currentUser}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={props => (
                  <MainContent {...props} user={currentUser} />
                )}
              />
            </Routes>
          )}
        </Router>
      </Container>
    );
  
}

export default App;

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
  //const userService = new UserService(props.auth);

  useEffect(() => {
    //userService.currentUser.subscribe(x =>setCurrentUser(x));
  }, [])
 
 const showRedirect =
    !currentUser && !props.sso ? (
      <Navigate to="/login" />
    ) : null;

    return (
      <Container fluid={true}>
        <Router>
          {showRedirect}
          <Heading userService={UserService} />
          {!currentUser && !props.sso && (
            <Routes>
              <Route path="/login" element = {<LoginPage userService={UserService} />}
              />
            </Routes>
          )}
          {currentUser && (
            <Routes>
              <Route path="/add" element={<UpdateCatalogListing {...props} user={currentUser}/>}
              />
              <Route path="/edit" element={<UpdateCatalogListing {...props} user={currentUser}/>}
              />
              <Route path="/" element={<MainContent {...props} user={currentUser} />}
              />
            </Routes>
          )}
        </Router>
      </Container>
    );
  
}

export default App;

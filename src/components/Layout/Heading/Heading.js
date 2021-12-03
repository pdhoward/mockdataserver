import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

const Heading = props => {
  let navigate = useNavigate();
  const handleLogout = () => {
    props.userService.logout();
    navigate("/login", { replace: true } );
  };

  const handleLogoClicked = () => {
    navigate("/", { replace: true } );
  };

  return (
    <Segment inverted style={{ padding: "1em 0em" }}>
      <Container fluid={true} style={{ height: "45px" }}>
        <Header
          size="huge"
          floated="left"
          inverted
          //onClick={handleLogoClicked}
          style={{ cursor: "pointer" }}
        >
          AI Testing Machine
        </Header>
        {props.userService.currentUserValue && (
          <Button
            inverted
            floated="right"
            attached="top"
            //onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Container>
    </Segment>
  );
};

export default Heading;

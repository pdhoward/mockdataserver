import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Header, Image, Form, Segment } from "semantic-ui-react";

const LoginPage = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let history = useNavigate();
  
 
  // redirect to home if already logged in
  if (props.userService.currentUserValue) {
    history.push("/");
  }
  

  const handleSubmit = async () => {
    try {
      await props.userService.login(email, password);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            <Image src="/Logo-RedHat-D-Color-RGB.png" /> Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={event => setEmail({ email: event.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={event =>
                  setPassword({ password: event.target.value })
                }
              />

              <Form.Button color="black" fluid size="large" type="submit">
                Login
              </Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  
}

export default LoginPage;

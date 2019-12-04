import { useEffect } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import Input from "./Input";
import { Button, Heading, Card, Flex } from "@theme-ui/components";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const Login = ({ refetch }) => {
  const [login, { data, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = (values, actions) => {
    console.log(values);
    login({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  };

  useEffect(() => {
    if (data && data.login && data.login.token) {
      localStorage.setItem("token", data.login.token);
      refetch();
    }
  }, [data]);

  return (
    <Flex
      sx={{
        alignItems: "baseline",
        justifyContent: "center"
      }}
    >
      <Card
        sx={{
          mt: 5,
          width: "full",
          maxWidth: "md",
          boxShadow: "lg",
          backgroundColor: "white"
        }}
      >
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            password: ""
          }}
        >
          {() => (
            <Form>
              <Heading as="h1" pb={3}>
                Login
              </Heading>
              <Input name="email" type="email" label="Email" />
              <Input name="password" type="password" label="Password" />
              <Button
                variant="primary"
                type="submit"
                sx={{
                  mt: 2
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default Login;

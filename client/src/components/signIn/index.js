import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Form,
  FormContainer,
  FormContentLeft,
  FormContentRight,
  FormH1,
  FormImg,
  FormInputs,
  FormLabel,
  Input,
  SpanSignUp,
  SpinnerContainer,
  SuccessH1,
} from './SignInElements';
import SignInFormValidation from './SignInFormValidation';
import { Redirect } from 'react-router';
import Axios from 'axios';
import { BounceLoader } from 'react-spinners';

const SignIn = ({
  apiSignIn,
  apiUserAuth
}) => {

  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectRegister, setRedirectRegister] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [redirectDashboardPage, setRedirectDashboardPage] = useState(false);

  useEffect(() => {
    if (isSubmitting === true) {
      Axios.post(apiSignIn, {
        usersEmail: inputValue.email,
        usersPassword: inputValue.password
      }).then((response) => {
        if (response.data.auth === true) {
          // console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          setIsAuthenticating(true);
          setShowAlert(false);
          setIsSubmitting(false);
        } else {
          // console.log(response.data.message);
          setAuthMessage(response.data.message);
          setShowAlert(true);
          setIsSubmitting(false);
        }
      });
    }

    if (isAuthenticating === true) {
      userAuthentication().then((result) => {
        if (result) {
          setRedirectDashboardPage(true);
          setIsAuthenticating(false);
        }
      });
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(SignInFormValidation(inputValue));
    setIsSubmitting(true);
  };

  const redirectRegisterHandler = () => {
    setRedirectRegister(true);
  };

  const alertHandler = () => {
    setShowAlert(false);
  };

  const userAuthentication = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Axios.get(apiUserAuth, {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }).then((response) => {
          // console.log(response.data);
          sessionStorage.setItem("name", response.data.users_name);
          sessionStorage.setItem("email", response.data.users_email);
          sessionStorage.setItem("role", response.data.users_role);
        });
        setIsAuthenticating(false);
        resolve(true);
      }, 3000);
    });
  };

  return (
    <>
      {redirectRegister ? <Redirect to='/signup' /> : ''}
      {redirectDashboardPage ? <Redirect to='/dashboard' /> : ''}
      <FormContainer>
        <FormContentLeft>
          <FormImg src={require('../../image/img-4.svg').default} />
        </FormContentLeft>

        {!isAuthenticating ? (
          <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
              <FormH1>
                Hi there, let's login into your account!
              </FormH1>
              <br />
              <FormInputs>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={inputValue.email}
                  onChange={handleChange}
                />
                {<p>{errors.email}</p>}
              </FormInputs>

              <FormInputs>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={inputValue.password}
                  onChange={handleChange}
                />
                {<p>{errors.password}</p>}
              </FormInputs>
              {!showAlert ? (<br />) : (
                <FormInputs>
                  <Alert>
                    <span onClick={alertHandler}>&times;</span>
                    <strong>Login failed! </strong>
                    {authMessage}
                  </Alert>
                </FormInputs>
              )}
              <Button>Sign In</Button>
              <SpanSignUp>
                Don't have account yet? <a onClick={redirectRegisterHandler}>Register here</a>
              </SpanSignUp>
            </Form>
          </FormContentRight>
        ) : (
          <FormContentRight>
            <SuccessH1>Authenticate . . .</SuccessH1>
            <SpinnerContainer>
              <BounceLoader size={36} color='white' loading />
            </SpinnerContainer>
          </FormContentRight>
        )}
      </FormContainer>
    </>
  );
};

export default SignIn;

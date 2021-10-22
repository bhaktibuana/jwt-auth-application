import React, { useState, useEffect } from 'react';
import FormValidation from './FormValidation';
import { Redirect } from 'react-router';
import Axios from 'axios';
import {
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
  SpanSignin,
  SuccessH1,
  SuccessImg
} from './SignInElements';

const SignUp = ({
  apiCheckUserEmail,
  apiInsertUser
}) => {

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkEmail, setCheckEmail] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (inputValue.email !== "") {
      Axios.get(apiCheckUserEmail + `/${inputValue.email}`).then((response) => {
        // console.log(response.data.length);
        setCheckEmail(response.data.length);
      });
    }

    if (isSubmitting === true) {
      if (!errors.stats && checkEmail === 1) {
        setIsSubmitting(false);
        errors.email = "Email is already taken";
      } else if (!errors.stats && checkEmail === 0) {
        Axios.post(apiInsertUser, {
          usersName: inputValue.name,
          usersEmail: inputValue.email,
          usersPassword: inputValue.password
        }).then((response) => {
          // console.log(response);
          if (response.status === 200) {
            asyncRedirect(response.status).then((result) => {
              result ? setRedirectLogin(true) : setRedirectLogin(false);
            });
            setFormSuccess(true);
          } else {
            setFormSuccess(false);
          }
        });
        setIsSubmitting(false);
      }
    }
  });

  const asyncRedirect = e => {
    return new Promise((resolve, reject) => {
      if (e === 200) {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      }
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(FormValidation(inputValue));
    setIsSubmitting(true);
  };

  return (
    <>
      {redirectLogin ? <Redirect to='/signin' /> : ''}
      <FormContainer>
        <FormContentLeft>
          <FormImg src={require('../../image/img-2.svg').default} />
        </FormContentLeft>

        {!formSuccess ? (
          <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
              <FormH1>
                Create your account for free!
              </FormH1>

              <FormInputs>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name='name'
                  placeholder='Enter your full name'
                  value={inputValue.name}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </FormInputs>

              <FormInputs>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={inputValue.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
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
                {errors.password && <p>{errors.password}</p>}
              </FormInputs>

              <FormInputs>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  name='passwordConf'
                  placeholder='Confirm your password'
                  value={inputValue.passwordConf}
                  onChange={handleChange}
                />
                {errors.passwordConf && <p>{errors.passwordConf}</p>}
              </FormInputs>

              <Button type='submit'>Sign Up</Button>
              <SpanSignin>
                Already have an account? <a href='/'>Login here</a>
              </SpanSignin>
            </Form>
          </FormContentRight>) : (

          <FormContentRight>
            <SuccessH1>Your registration is successful! <br /> Please check your email to verify your account.</SuccessH1>
            <SuccessImg src={require('../../image/img-3.svg').default} />
          </FormContentRight>
        )}

      </FormContainer>
    </>
  );
};

export default SignUp;

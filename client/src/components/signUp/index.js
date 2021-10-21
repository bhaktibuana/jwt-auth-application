import React, { useState } from 'react';
import FormValidation from './FormValidation';
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
  SpanSignin
} from './SignInElements';

const SignUp = () => {

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log(isSubmitting);
  };

  return (
    <>
      <FormContainer>
        <FormContentLeft>
          <FormImg src={require('../../image/img-2.svg').default} alt='spaceship' />
        </FormContentLeft>

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
        </FormContentRight>
      </FormContainer>
    </>
  );
};

export default SignUp;

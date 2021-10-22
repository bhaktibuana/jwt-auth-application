import React from 'react';
import { apiUrl } from '../api/apiUrl';
import SignIn from '../components/signIn';

const SignInPage = () => {
  return (
    <>
      <SignIn {...apiUrl} />
    </>
  );
};

export default SignInPage

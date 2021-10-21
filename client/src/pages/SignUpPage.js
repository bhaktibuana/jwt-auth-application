import React from 'react';
import { apiUrl } from '../api/apiUrl';
import SignUp from '../components/signUp';

const SignUpPage = () => {
  return (
    <>
      <SignUp {...apiUrl} />
    </>
  );
};

export default SignUpPage;

import React, { useState } from 'react';
import {
  Button,
  Profile,
  ProfileContainer,
  ProfileContentLeft,
  ProfileContentRight,
  ProfileH1,
  ProfileH2
} from './UserPorifleElements';
import { Redirect } from 'react-router';

const UserProfile = ({ headline }) => {

  const [redirectLogin, setRedirectLogin] = useState(false);
  const [redirectRegister, setRedirectRegister] = useState(false);
  const [redirectPage, setRedirectPage] = useState(false);

  const redirectLoginHandler = () => {
    setRedirectLogin(true);
  };

  const redirectRegisterHandler = () => {
    setRedirectRegister(true);
  };

  const userStorageHandler = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    setRedirectPage(true);
  }

  return (
    <>
      {redirectLogin ? <Redirect to='/signin' /> : ''}
      {redirectRegister ? <Redirect to='/signup' /> : ''}
      {redirectPage ? <Redirect to='/' /> : ''}
      <ProfileContainer>
        <ProfileContentLeft>
          <Profile>
            <ProfileH1>
              {headline}
            </ProfileH1>
          </Profile>
        </ProfileContentLeft>

        {localStorage.getItem("name") !== null || sessionStorage.getItem("name") !== null ? (
          <ProfileContentRight>
            <Profile>
              <ProfileH1>
                Hello!
              </ProfileH1>
              <ProfileH2>
                {sessionStorage.getItem("name") === null ? `${localStorage.getItem("name")}` : `${sessionStorage.getItem("name")}`}
              </ProfileH2>
              <Button onClick={userStorageHandler}>Sign Out</Button>
            </Profile>
          </ProfileContentRight >
        ) : (
          <ProfileContentRight>
            <Profile>
              <ProfileH1>
                Welcome to BSA
              </ProfileH1>
              <ProfileH2>
                Don't have any account yet?
              </ProfileH2>
              <Button onClick={redirectRegisterHandler}>
                Sign Up
              </Button>
              <br />
              <ProfileH2>
                Or login into your account here
              </ProfileH2>
              <Button onClick={redirectLoginHandler}>
                Sign In
              </Button>
            </Profile>
          </ProfileContentRight>
        )}
      </ProfileContainer >
    </>
  );
};

export default UserProfile;

import React from 'react';
import UserProfile from '../components/userProfile';
import { UserProfileLandingPage } from '../components/userProfile/UserProfileLandingPage';

const LandingPage = () => {
  return (
    <>
      <UserProfile {...UserProfileLandingPage} />
    </>
  );
};

export default LandingPage;

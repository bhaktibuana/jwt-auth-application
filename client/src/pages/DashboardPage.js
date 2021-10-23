import React, { useState } from 'react';
import UserProfile from '../components/userProfile';
import { UserProfileDashboard } from '../components/userProfile/UserProfileDashboard';
import { Redirect } from 'react-router';

const DashboardPage = () => {

  const redirectHandler = () => {
    if (localStorage.getItem("role") === null) {
      if (sessionStorage.getItem("role") === null) {
        return true;
      } else {
        if (sessionStorage.getItem("role") === "admin") {
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (localStorage.getItem("role") === "admin") {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <>
      {redirectHandler() === true ? <Redirect to='/' /> : ''}
      {console.log(redirectHandler())}
      <UserProfile {...UserProfileDashboard} />
    </>
  );
};

export default DashboardPage;
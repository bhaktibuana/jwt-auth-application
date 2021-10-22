const apiBaseUrl = 'http://localhost:3001';
// const apiBaseUrl = 'http://192.168.1.119:3001';

export const apiUrl = {
  apiCheckUserEmail: `${apiBaseUrl}/api/get_available_users`,
  apiSignUp: `${apiBaseUrl}/api/signup`,
  apiSignIn: `${apiBaseUrl}/api/signin`,
  apiUserAuth: `${apiBaseUrl}/api/user_authentication`
};
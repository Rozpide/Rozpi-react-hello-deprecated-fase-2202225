import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { api } from '../axios';

const GoogleLoginComponent = () => {
  const handleSuccess = async (response) => {
    const { tokenId } = response;
    const res = await api.post('/auth/google-login', { token: tokenId });
    console.log(res.data);
  };

  return (
    <GoogleLogin
      clientId="TU_CLIENT_ID_DE_GOOGLE"
      buttonText="Iniciar sesión con Google"
      onSuccess={handleSuccess}
      onFailure={(err) => console.error('Error', err)}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;

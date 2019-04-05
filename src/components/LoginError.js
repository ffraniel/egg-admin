import React from 'react';
import './LoginError.css';

const LoginError = ({ closeError }) => {
  return (
    <section className="login-error" onClick={()=>{closeError()}}>
      <h4>There has been an error Loggin in. The password has not been recognised</h4>
      <h3>X</h3>
    </section>
  );
};

export default LoginError;
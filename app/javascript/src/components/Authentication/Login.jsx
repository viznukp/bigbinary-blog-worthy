import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async payload => {
    setLoading(true);
    try {
      const data = await authApi.login(payload);
      setToLocalStorage({
        authToken: data.authenticationToken,
        email: payload.email.toLowerCase(),
        userId: data.id,
        userName: data.name,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return <LoginForm handleSubmit={handleSubmit} loading={loading} />;
};

export default Login;

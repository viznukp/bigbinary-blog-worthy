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
      const response = await authApi.login(payload);
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: payload.email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
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

import React, { useState } from "react";

import authApi from "apis/auth";
import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async payload => {
    setLoading(true);
    try {
      await authApi.signup(payload);

      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return <SignupForm handleSubmit={handleSubmit} loading={loading} />;
};

export default Signup;

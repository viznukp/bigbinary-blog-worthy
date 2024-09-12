import React, { useState, useEffect } from "react";

import authApi from "apis/auth";
import organizationsApi from "apis/organizations";
import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [organizationsList, setOrganizationsList] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.fetch();
      setOrganizationsList(organizations);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async payload => {
    setLoading(true);
    try {
      await authApi.signup({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.passwordConfirmation,
        organization_id: payload.organization.id,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizationsList}
    />
  );
};

export default Signup;

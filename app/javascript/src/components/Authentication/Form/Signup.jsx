import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Input, Form as NeetoUIForm } from "@bigbinary/neetoui/formik";
import { Link } from "react-router-dom";

const Signup = ({ handleSubmit, loading }) => (
  <div
    className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
  >
    <div className="w-full max-w-md">
      <h2
        className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-700"
      >
        Sign Up
      </h2>
      <div className="text-center">
        <Link
          to="/"
          className="text-bb-purple mt-2 text-center text-sm
            font-medium transition duration-150 ease-in-out
            ease-in-out focus:underline"
        >
          Or Login Now
        </Link>
      </div>
      <NeetoUIForm
        className="mt-8 flex flex-col gap-y-6"
        formikProps={{
          initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            organizationName: "",
          },
          onSubmit: handleSubmit,
        }}
      >
        <Input label="Name" name="name" placeholder="Oliver" />
        <Input
          label="Email"
          name="email"
          placeholder="oliver@example.com"
          type="email"
        />
        <Input
          label="Organization"
          name="organizationName"
          placeholder="Name of your organization"
        />
        <Input
          label="Password"
          name="password"
          placeholder="********"
          type="password"
        />
        <Input
          label="Password Confirmation"
          name="passwordConfirmation"
          placeholder="********"
          type="password"
        />
        <Button label="Register" loading={loading} type="submit" />
      </NeetoUIForm>
    </div>
  </div>
);

export default Signup;

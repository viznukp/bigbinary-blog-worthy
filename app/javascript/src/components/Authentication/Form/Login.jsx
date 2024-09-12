import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Input, Form as NeetoUIForm } from "@bigbinary/neetoui/formik";
import { Link } from "react-router-dom";

const Login = ({ handleSubmit, loading }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700">
        Sign In
      </h2>
      <div className="text-center">
        <Link
          className="focus:outline-none mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline"
          to="/signup"
        >
          Or Register Now
        </Link>
      </div>
      <NeetoUIForm
        className="mt-8 flex flex-col gap-y-6"
        formikProps={{
          initialValues: {
            email: "",
            password: "",
          },
          onSubmit: handleSubmit,
        }}
      >
        <Input
          label="Email"
          name="email"
          placeholder="oliver@example.com"
          type="email"
        />
        <Input
          label="Password"
          name="password"
          placeholder="********"
          type="password"
        />
        <Button label="Sign In" loading={loading} type="submit" />
      </NeetoUIForm>
    </div>
  </div>
);

export default Login;

import React, { useState } from "react";

import { Pane, Button } from "@bigbinary/neetoui";
import { Form as NeetoUIForm } from "@bigbinary/neetoui/formik";
// import { useHistory } from "react-router-dom";

import postsApi from "apis/posts";

import Form from "./Form";

const Create = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  // const history = useHistory();

  const handleSubmit = async payload => {
    try {
      await postsApi.create({ post: payload });
      setIsPaneOpen(false);
      // history.push("/home");
      window.location.reload();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Button
        className="bg-indigo-600 hover:bg-indigo-700"
        label="Create new post"
        onClick={() => setIsPaneOpen(true)}
      />
      <Pane
        className="flex flex-col gap-6"
        isOpen={isPaneOpen}
        onClose={() => setIsPaneOpen(false)}
      >
        <NeetoUIForm
          className="flex flex-col gap-4 px-2"
          formikProps={{
            initialValues: {
              title: "",
              description: "",
            },
            onSubmit: handleSubmit,
          }}
        >
          <Form handleCancel={() => setIsPaneOpen(false)} />
        </NeetoUIForm>
      </Pane>
    </>
  );
};

export default Create;

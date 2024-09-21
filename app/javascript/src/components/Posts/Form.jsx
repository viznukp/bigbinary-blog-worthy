import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { Input, Textarea } from "@bigbinary/neetoui/formik";

const Form = ({ handleCancel }) => (
  <div className="mt-6 flex flex-col gap-4">
    <Typography weight="bold">Add new post</Typography>
    <Input
      required
      label="Title"
      name="title"
      placeholder="Title of the post"
      size="medium"
    />
    <Textarea
      required
      label="Description"
      name="description"
      placeholder="Add detailed description of the post"
    />
    <div className="flex gap-2">
      <Button label="Create" type="submit" />
      <Button label="Cancel" style="danger" onClick={handleCancel} />
    </div>
  </div>
);

export default Form;

import React, { useState } from "react";

import { Modal, Typography, Button, Input } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";

import categoriesApi from "../../apis/categories";

const Create = ({ isCreateEnabled, disableCreate, reloadCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    try {
      await categoriesApi.create({ name: categoryName });
      reloadCategories();
      disableCreate();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal
      className="mt-6 flex flex-col gap-3 p-4"
      isOpen={isCreateEnabled}
      onClose={disableCreate}
    >
      <Typography style="h3">New category</Typography>
      <Input
        label="Category title"
        onChange={event => setCategoryName(event.target.value)}
      />
      <div className="mt-4 flex gap-2">
        <Button
          className="bg-black"
          disabled={isEmpty(categoryName)}
          label="Add"
          onClick={handleSubmit}
        />
        <Button label="Cancel" style="secondary" onClick={disableCreate} />
      </div>
    </Modal>
  );
};

export default Create;

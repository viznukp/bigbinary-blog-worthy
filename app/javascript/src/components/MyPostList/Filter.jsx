import React, { useState } from "react";

import { Typography, Pane, Button } from "@bigbinary/neetoui";
import { Form as NeetoUIForm, Input, Select } from "@bigbinary/neetoui/formik";

import { CategorySelector } from "components/commons";
import { POST_STATUSES } from "components/constants";

import { FILTER_INITIAL_VALUES } from "./constants";

const Filter = ({ isOpen, closeFilter, setFilterParams }) => {
  const [filterValues, setFilterValues] = useState(FILTER_INITIAL_VALUES);

  const handleFilterSubmit = values => {
    const filter = {
      ...values,
      user: "current",
      categories: values.categories?.map(value => value.name),
      status: values.status?.value,
    };
    setFilterParams(filter);
    setFilterValues(filter);
  };

  return (
    <Pane className="px-4 pt-12 pb-4" isOpen={isOpen} onClose={closeFilter}>
      <Typography style="h2"> Filters</Typography>
      <NeetoUIForm
        className="mt-4 flex flex-col gap-3"
        formikProps={{
          initialValues: filterValues,
          onSubmit: handleFilterSubmit,
        }}
      >
        <Input label="Title" name="title" />
        <CategorySelector />
        <Select
          isClearable
          label="Status"
          name="status"
          options={[
            { label: "Draft", value: POST_STATUSES.DRAFT.STATUS },
            { label: "Published", value: POST_STATUSES.PUBLISHED.STATUS },
          ]}
        />
        <div className="flex gap-2">
          <Button
            className=" bg-neeto-ui-black bg-black"
            label="Apply"
            type="submit"
          />
          <Button
            className="bg-gray-300 text-black"
            label="Clear filters"
            onClick={() => {
              handleFilterSubmit(FILTER_INITIAL_VALUES);
              closeFilter();
            }}
          />
        </div>
      </NeetoUIForm>
    </Pane>
  );
};

export default Filter;

import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Button } from "@bigbinary/neetoui";

import { POST_STATUSES } from "components/constants";

import postsApi from "../../apis/posts";

const ActionsList = ({ status, slug, reloadPosts }) => {
  const handleUpdate = async () => {
    const updatedStatus =
      status === POST_STATUSES.PUBLISHED.STATUS
        ? POST_STATUSES.DRAFT.STATUS
        : POST_STATUSES.PUBLISHED.STATUS;

    try {
      await postsApi.update({
        slug,
        payload: {
          status: updatedStatus,
        },
      });
      reloadPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.destroy(slug);
      reloadPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <div className="flex flex-col">
        <Button
          style="text"
          label={
            status === POST_STATUSES.PUBLISHED.STATUS ? "Unpublish" : "Publish"
          }
          onClick={handleUpdate}
        />
        <Button label="Delete" style="danger-text" onClick={handleDelete} />
      </div>
    </Dropdown>
  );
};
export default ActionsList;

import React, { useState, useEffect } from "react";

import { Modal, Typography } from "@bigbinary/neetoui";

import postsApi from "../../apis/posts";

const Show = ({ postId, isOpen, setIsPostClicked }) => {
  const [postData, setPostData] = useState({});

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(postId);
      setPostData(post);
      setIsPostClicked(true);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  return (
    <Modal
      className="px-6 py-6"
      isOpen={isOpen}
      onClose={() => setIsPostClicked(false)}
    >
      <Typography style="h3" weight="semibold">
        {postData.title}
      </Typography>
      <Typography className="mt-4 max-h-64 overflow-scroll">
        {postData.description}
      </Typography>
    </Modal>
  );
};

export default Show;

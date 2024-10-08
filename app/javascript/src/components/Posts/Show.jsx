import React, { useEffect, useState } from "react";

import { Modal, Typography } from "@bigbinary/neetoui";

import postsApi from "apis/posts";

const Show = ({ slug, isModalOpen, setIsModalOpen }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post: postDetails },
      } = await postsApi.show(slug);
      setPost(postDetails);
      setLoading(false);
    } catch (error) {
      logger.error = error;
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <>
      {!loading && (
        <Modal
          className="px-6 py-6"
          isOpen={isModalOpen}
          size="large"
          onClose={() => setIsModalOpen(false)}
        >
          <Typography className="text-blue-600" style="h3" weight="semibold">
            {post?.title}
          </Typography>
          <Typography className="mt-2" style="h5" weight="normal">
            {post?.author?.name}
          </Typography>
          <Typography className="mt-4 max-h-64 overflow-auto rounded-md border bg-blue-50 p-2">
            {post?.description}
          </Typography>
        </Modal>
      )}
    </>
  );
};

export default Show;

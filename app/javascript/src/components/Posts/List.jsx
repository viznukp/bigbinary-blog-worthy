import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";

import Card from "./Card";

import PageLoader from "../commons/PageLoader";

const List = ({ handlePostClick, setSelectedPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <h1 className="my-12 text-center text-xl leading-5">
        No posts yet. Share something exciting!
      </h1>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-2">
      {posts.map(post => (
        <Card
          data={post}
          handlePostClick={handlePostClick}
          key={post.id}
          setSelectedPost={setSelectedPost}
        />
      ))}
    </div>
  );
};

export default List;
import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";
import { PageLoader } from "components/commons";

import Card from "./Card";

const List = ({ needReload }) => {
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
  }, [needReload]);

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
        <Card data={post} key={post.id} />
      ))}
    </div>
  );
};

export default List;

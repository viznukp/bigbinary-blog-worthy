import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";
import { PageLoader, PageTitle } from "components/commons";

import Card from "./Card";
import Create from "./Create";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needPostReload, setNeedPostReload] = useState(true);

  const reloadPosts = () => setNeedPostReload(prevValue => !prevValue);

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
  }, [needPostReload]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Posts">
        <Create reloadPosts={reloadPosts} />
      </PageTitle>
      {either(isNil, isEmpty)(posts) ? (
        <h1 className="my-12 text-center text-xl leading-5">
          No posts yet. Share something exciting!
        </h1>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {posts.map(post => (
            <Card data={post} key={post.slug} reloadPosts={reloadPosts} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;

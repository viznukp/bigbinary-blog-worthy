import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";

import postsApi from "apis/posts";
import Posts from "components/Posts";

import Container from "../commons/Container";
import PageLoader from "../commons/PageLoader";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      Logger.error(error);
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
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created any posts.
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <Posts posts={posts} />
    </Container>
  );
};

export default Dashboard;

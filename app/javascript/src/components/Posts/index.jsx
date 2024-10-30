import React, { useState, useEffect } from "react";

import { Button } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import postsApi from "apis/posts";
import CategoryList from "components/CategoryList";
import { PageLoader, PageTitle, Container } from "components/commons";

import Card from "./Card";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const history = useHistory();

  const fetchPosts = async () => {
    try {
      const { posts } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategories]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container
      additionalSidebar={
        <CategoryList
          setSelectedCategories={setSelectedCategories}
          show={isCategoryListVisible}
        />
      }
    >
      <PageTitle title="Posts">
        <Button
          className="bg-black"
          label="Filter by category"
          onClick={() => setIsCategoryListVisible(!isCategoryListVisible)}
        />
        <Button
          className="bg-black"
          label="Create new post"
          onClick={() => history.push("/posts/new")}
        />
      </PageTitle>
      {either(isNil, isEmpty)(posts) ? (
        <h1 className="my-12 text-center text-xl leading-5">
          No posts yet. Share something exciting!
        </h1>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {posts.map(post => (
            <Card data={post} key={post.slug} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Posts;

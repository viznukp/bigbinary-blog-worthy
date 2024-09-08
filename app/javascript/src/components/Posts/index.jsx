import React from "react";

import Card from "./Card";

import PageTitle from "../commons/PageTitle";

const Posts = ({ posts }) => (
  <>
    <PageTitle title="Posts" />
    <div className="mt-6 flex flex-col gap-2">
      {posts.map(post => (
        <Card description={post.description} key={post.id} title={post.title} />
      ))}
    </div>
  </>
);
export default Posts;

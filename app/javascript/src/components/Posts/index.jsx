import React, { useState } from "react";

import Create from "./Create";
import List from "./List";
import Show from "./Show";

import Container from "../commons/Container";
import PageTitle from "../commons/PageTitle";

const Posts = () => {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [selectedPost, setSelectedPost] = useState(undefined);

  return (
    <Container>
      <PageTitle title="Posts">
        <Create />
      </PageTitle>
      <List
        handlePostClick={setIsPostClicked}
        setSelectedPost={setSelectedPost}
      />
      <Show
        isOpen={isPostClicked}
        postId={selectedPost}
        setIsPostClicked={setIsPostClicked}
      />
    </Container>
  );
};

export default Posts;

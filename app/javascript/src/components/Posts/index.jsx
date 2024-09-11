import React, { useState } from "react";

import { Container, PageTitle } from "components/commons";

import Create from "./Create";
import List from "./List";

const Posts = () => {
  const [needPostReload, setNeedPostReload] = useState(true);

  const reload = () => setNeedPostReload(prevValue => !prevValue);

  return (
    <Container>
      <PageTitle title="Posts">
        <Create reload={reload} />
      </PageTitle>
      <List needReload={needPostReload} />
    </Container>
  );
};

export default Posts;

import React, { useState, useEffect } from "react";

import { Table } from "@bigbinary/neetoui";

import postsApi from "apis/posts";
import { PageLoader, Container, PageTitle } from "components/commons";

import ActionsList from "./ActionsList";
import { POSTS_TABLE_SCHEMA } from "./constants";
import TitleToLink from "./TitleToLink";

import { dateFromTimeStamp } from "../../utils/dateTime";

const MyPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostsIds, setSelectedPostsIds] = useState([]);
  const [needReload, setNeedReload] = useState(false);

  const transformPostsForTableDisplay = posts =>
    posts.map(({ id, title, slug, status, updatedAt, categories }) => ({
      id,
      key: id,
      title: <TitleToLink slug={slug} title={title} />,
      status,
      category: categories.map(category => category.name).join(", "),
      publishedAt: dateFromTimeStamp(updatedAt),
      actions: (
        <ActionsList
          reloadPosts={() => setNeedReload(!needReload)}
          slug={slug}
          status={status}
        />
      ),
    }));

  const handleSelection = selectedRowKeys => {
    setSelectedPostsIds(selectedRowKeys);
  };

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
  }, [needReload]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PageTitle title="My blog posts" />
      <Table
        rowSelection
        columnData={POSTS_TABLE_SCHEMA}
        rowData={posts ? transformPostsForTableDisplay(posts) : []}
        selectedRowKeys={selectedPostsIds}
        totalCount={posts.length}
        onRowSelect={handleSelection}
      />
    </Container>
  );
};

export default MyPostList;

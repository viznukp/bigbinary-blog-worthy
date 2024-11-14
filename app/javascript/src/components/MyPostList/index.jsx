import React, { useState, useEffect } from "react";

import {
  Table,
  Typography,
  ActionDropdown,
  Checkbox,
} from "@bigbinary/neetoui";
import { without } from "ramda";

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
  const [visibleColumns, setVisibleColumns] = useState(POSTS_TABLE_SCHEMA);
  const [columnsToHide, setColumnsToHide] = useState([]);

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

  const filterColumns = columns =>
    POSTS_TABLE_SCHEMA.filter(column => !columns.includes(column.key));

  const handleColumnFilterChange = key => {
    const updatedColumnsToHide = columnsToHide.includes(key)
      ? without([key], columnsToHide)
      : [...columnsToHide, key];

    setColumnsToHide(updatedColumnsToHide);
    setVisibleColumns(filterColumns(updatedColumnsToHide));
  };

  const handleSelection = selectedRowKeys => {
    setSelectedPostsIds(selectedRowKeys);
  };

  const fetchPosts = async () => {
    try {
      const { posts } = await postsApi.fetch({
        filters: { user: "current" },
      });
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
      <div className="mb-3 flex justify-between">
        <Typography>{`${posts.length} articles`}</Typography>
        <ActionDropdown
          label="Columns"
          buttonProps={{
            className: "bg-gray-300 text-black",
          }}
          dropdownProps={{
            buttonProps: {
              className: "bg-gray-300 text-black",
            },
          }}
        >
          <div className="flex flex-col gap-3 p-4">
            {POSTS_TABLE_SCHEMA.map(
              ({
                title,
                key,
                excludeFromColumnFilter,
                isDisabledInColumnFilter,
              }) =>
                !excludeFromColumnFilter && (
                  <Checkbox
                    checked={!columnsToHide.includes(key)}
                    disabled={isDisabledInColumnFilter}
                    key={key}
                    label={title}
                    value={key}
                    onChange={() => handleColumnFilterChange(key)}
                  />
                )
            )}
          </div>
        </ActionDropdown>
      </div>
      <Table
        rowSelection
        columnData={visibleColumns}
        rowData={posts ? transformPostsForTableDisplay(posts) : []}
        selectedRowKeys={selectedPostsIds}
        onRowSelect={handleSelection}
      />
    </Container>
  );
};

export default MyPostList;

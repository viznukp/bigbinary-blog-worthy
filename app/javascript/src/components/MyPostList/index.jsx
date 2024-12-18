import React, { useState, useEffect } from "react";

import { Filter as FilterIcon, Delete } from "@bigbinary/neeto-icons";
import {
  Table,
  Typography,
  ActionDropdown,
  Checkbox,
  Button,
  Dropdown,
} from "@bigbinary/neetoui";
import { without, isEmpty } from "ramda";

import postsApi from "apis/posts";
import { PageLoader, Container, PageTitle } from "components/commons";
import { POST_STATUSES } from "components/constants";

import ActionsList from "./ActionsList";
import { POSTS_TABLE_SCHEMA } from "./constants";
import Filter from "./Filter";
import TitleToLink from "./TitleToLink";

import { dateFromTimeStamp } from "../../utils/dateTime";

const MyPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostsIds, setSelectedPostsIds] = useState([]);
  const [selectedPostsSlugs, setSelectedPostsSlugs] = useState([]);
  const [needReload, setNeedReload] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(POSTS_TABLE_SCHEMA);
  const [columnsToHide, setColumnsToHide] = useState([]);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({ user: "current" });

  const transformPostsForTableDisplay = posts =>
    posts.map(({ id, title, slug, status, updatedAt, categories }) => ({
      id,
      slug,
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

  const updatePosts = async status => {
    try {
      await postsApi.bulkUpdate({
        slugs: selectedPostsSlugs,
        updateFields: { status },
      });
      setNeedReload(!needReload);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePosts = async () => {
    try {
      await postsApi.bulkDestroy(selectedPostsSlugs);
      setNeedReload(!needReload);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedPostsSlugs(selectedRows.map(row => row.slug));
    setSelectedPostsIds(selectedRowKeys);
  };

  const fetchPosts = async () => {
    try {
      const { posts } = await postsApi.fetch({
        filters: filterParams,
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
  }, [needReload, filterParams]);

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
        <div className="flex gap-2">
          {!isEmpty(selectedPostsSlugs) ? (
            <>
              <Dropdown buttonStyle="secondary" label="Change status">
                <div className="flex flex-col">
                  <Button
                    label="Publish"
                    style="text"
                    onClick={() => updatePosts(POST_STATUSES.PUBLISHED.STATUS)}
                  />
                  <Button
                    label="Draft"
                    style="text"
                    onClick={() => updatePosts(POST_STATUSES.DRAFT.STATUS)}
                  />
                </div>
              </Dropdown>
              <Button
                icon={Delete}
                label="Delete"
                style="danger-text"
                onClick={deletePosts}
              />
            </>
          ) : (
            <>
              <ActionDropdown buttonStyle="secondary" label="Columns">
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
              <Button
                icon={FilterIcon}
                style="text"
                onClick={() => setIsFilterPaneOpen(!isFilterPaneOpen)}
              />
            </>
          )}
        </div>
      </div>
      <Table
        rowSelection
        columnData={visibleColumns}
        rowData={posts ? transformPostsForTableDisplay(posts) : []}
        selectedRowKeys={selectedPostsIds}
        onRowSelect={handleRowSelection}
      />
      <Filter
        closeFilter={() => setIsFilterPaneOpen(false)}
        isOpen={isFilterPaneOpen}
        setFilterParams={setFilterParams}
      />
    </Container>
  );
};

export default MyPostList;

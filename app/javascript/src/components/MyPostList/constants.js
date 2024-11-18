export const POSTS_TABLE_SCHEMA = [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: 100,
    isDisabledInColumnFilter: true,
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: 75,
  },
  {
    title: "LAST PUBLISHED AT",
    dataIndex: "publishedAt",
    key: "publishedAt",
    width: 50,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: 25,
  },
  {
    dataIndex: "actions",
    key: "actions",
    width: 25,
    excludeFromColumnFilter: true,
  },
];

export const FILTER_INITIAL_VALUES = {
  title: "",
  categories: [],
  status: "",
};

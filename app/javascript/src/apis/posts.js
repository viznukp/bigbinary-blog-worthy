import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, { post: payload });

const postsApi = { fetch, create, show, update };

export default postsApi;

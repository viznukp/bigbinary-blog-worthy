import axios from "axios";
import qs from "qs";

// const fetch = filters => axios.get("/posts", { params: filters });

const fetch = filters =>
  axios.get("/posts", {
    params: filters,
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: "brackets" }),
  });

const create = payload => axios.post("/posts", { post: payload });

const show = slug => axios.get(`/posts/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, { post: payload });

const postsApi = { fetch, create, show, update };

export default postsApi;

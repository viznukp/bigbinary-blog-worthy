import axios from "axios";

const fetch = () => axios.get("/posts");

const create = payload => axios.post("/posts", payload);

const show = id => axios.get(`/posts/${id}`);

const postsApi = { fetch, create, show };

export default postsApi;

import axios from "axios";
import qs from "qs";

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

const bulkUpdate = ({ slugs, updateFields }) =>
  axios.put("posts/bulk_update", { posts: { updateFields, slugs } });

const destroy = slug => axios.delete(`/posts/${slug}`);

const bulkDestroy = slugs =>
  axios.delete("/posts/bulk_destroy", { data: { posts: { slugs } } });

const generatePdf = slug => axios.post("/posts/report", { post: { slug } });

const download = () =>
  axios.get("/posts/report/download", { responseType: "blob" });

const postsApi = {
  fetch,
  create,
  show,
  update,
  bulkUpdate,
  destroy,
  bulkDestroy,
  generatePdf,
  download,
};

export default postsApi;

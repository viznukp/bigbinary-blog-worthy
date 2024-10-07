import axios from "axios";

const create = payload => axios.post(`/votes`, { vote: payload });

const votesApi = {
  create,
};

export default votesApi;

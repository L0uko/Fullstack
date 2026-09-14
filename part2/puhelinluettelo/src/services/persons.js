import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const remove = (personId) => {
  const url = `${baseUrl}/${personId}`;
  console.log("url is ", url);
  return axios.delete(url);
};

export default { getAll, create, remove };

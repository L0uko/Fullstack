import axios from "axios";
const baseUrl = "/api/persons";

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

const update = (personId, updatedPerson) => {
  const url = `${baseUrl}/${personId}`;
  console.log(`url = ${url}, updated person = ${updatedPerson}`);
  const request = axios.put(url, updatedPerson);
  return request.then((response) => response.data);
};

const remove = (personId) => {
  const url = `${baseUrl}/${personId}`;
  console.log("url is ", url);
  return axios.delete(url);
};

export default { getAll, create, update, remove };

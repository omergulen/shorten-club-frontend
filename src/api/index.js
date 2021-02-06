import axios from 'axios';

const host = 'https://api.shorten.club';

const putRequest = (path, params) => {
  const headers = {};
  const token = window.localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] =  `Bearer ${token}`;
  }
  return axios.post(host + path, params, {
    headers: headers
  });
};

const postRequest = (path, params) => {
  const headers = {};
  const token = window.localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] =  `Bearer ${token}`;
  }
  return axios.post(host + path, params, {
    headers: headers
  });
};

const getRequest = (path, params) => {
  const headers = {};
  const token = window.localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] =  `Bearer ${token}`;
  }
  return axios.get(host + path, {
    headers: headers
  });
};

export const getAuthToken = async () => {
  return getRequest('/auth').then((res) => {return res;});
};

export const initialSlug = async (type) => {
  let path = '/initial';
  if (type) {
    path += `?type=${type}`;
  }
  return getRequest(path).then((res) => {return res;});
};

export const getRecord = async (id) => {
  return getRequest(`/${id}`).then((res) => {return res;});
};

export const updateRecord = (slug, content) => {
  return postRequest('/updateRecord', {
    slug,
    content
  });
};

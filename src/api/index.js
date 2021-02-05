import axios from 'axios';

const host = 'http://192.168.90.46:8080';

const putRequest = (path, params) => {
  return axios.post(host + path, params);
};

const postRequest = (path, params) => {
  return axios.post(host + path, params);
};

const getRequest = (path, params) => {
  return axios.get(host + path);
};

export const getAuthToken = () => {
  getRequest('getAuthToken')
    .then((response) => {
      console.log('response: ', response);
    }).catch((err) => {
      console.log('err: ', err);
    });
};

export const initialSlug = async (authToken = '') => {
  return getRequest('/initial').then((res) => {return res;});
};

const putContent = (slug, content) => {
  putRequest(slug, content)
    .then((response) => {
      console.log('response: ', response);
    }).catch((err) => {
      console.log('err: ', err);
    });
};

const getContent = (slug, content) => {
  getRequest(slug, content)
    .then((response) => {
      console.log('response: ', response);
    }).catch((err) => {
      console.log('err: ', err);
    });
};


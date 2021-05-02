import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

const camelSerializer = new CamelcaseSerializer();
const snakeSerializer = new SnakecaseSerializer();

export const createApiWithURL = baseURL =>
  create({
    baseURL,
    timeout: 15000
  });

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000
});

export const headers = {
  AUTHORIZATION: 'Authorization'
};

export const setAuthHeader = token => api.setHeader(headers.AUTHORIZATION, `Bearer ${token}`);

api.addResponseTransform(response => {
  if (response.data) {
    response.data = camelSerializer.serialize(response.data);
  }
});

api.addRequestTransform(request => {
  if (request.data) {
    request.data = snakeSerializer.serialize(request.data);
  }
});

export default api;

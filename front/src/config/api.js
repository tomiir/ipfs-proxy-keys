import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

import LocalStorageService from '~services/LocalStorageService';

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
  if (response.status === 401) {
    LocalStorageService.removeTokenManager();
  }
  if (response.data) {
    response.data = camelSerializer.serialize(response.data);
  }
});

api.addRequestTransform(request => {
  const tokenManager = LocalStorageService.getTokenManager();
  setAuthHeader(tokenManager?.token);
  if (request.data) {
    request.data = snakeSerializer.serialize(request.data);
  }
});

export default api;

import api from '~config/api';

export const getKeys = () => api.get('/keys');
export const createKey = key => api.post('/keys', key);

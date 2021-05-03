import api from '~config/api';

export const getKeys = () => api.get('/keys');
export const createKey = key => api.post('/keys', key);
export const updateKey = key => api.patch(`/keys/${key.id}`, key);

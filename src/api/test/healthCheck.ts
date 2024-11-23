import apiClient from '..';

const healthCheck = async () => {
  const response = await apiClient.get('/healthcheck');
  return response.data;
};

export default healthCheck;

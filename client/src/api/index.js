import axios from 'axios';

const api = axios.create({
	baseURL: '/gpus',
});

export const getAllGpus = () => api.get();
const apis = {
  getAllGpus,
}

export default apis;
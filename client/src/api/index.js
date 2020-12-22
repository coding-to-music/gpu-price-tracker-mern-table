import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000/gpus',
});

export const getAllGpus = () => api.get();
const apis = {
  getAllGpus,
}

export default apis;
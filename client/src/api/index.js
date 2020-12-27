import axios from 'axios';

const api = axios.create({
	baseURL: '/gpus',
});

export const getAllGpus = () => api.get();

export const getLastUpdatedDate = () => api.get('/lastUpdated');


import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://111.111.111.97:7000/api' });
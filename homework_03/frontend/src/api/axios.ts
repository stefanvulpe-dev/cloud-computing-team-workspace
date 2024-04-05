import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${"http://34.128.151.8/api/v1"}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

import axios from 'axios';

// .env에 REACT_APP_BASE_URL 없으면 기본 로컬주소 사용
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

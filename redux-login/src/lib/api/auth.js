import axios from 'axios';
export const login = ({ id }) =>
  axios.get(`http://localhost:4000/userinfo/${id}`);

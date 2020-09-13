import axios from 'axios';
axios.defaults.withCredentials=true;
const request = axios.create({
    // baseURL:'http://120.25.229.45:5000',
    baseURL:'http://localhost:5000',
    withCredentials:true
});

export default request;
import axios from 'axios';

const request = axios.create({
    baseURL:'http://120.25.229.45:5000',
    withCredentials:true
});

export default request;
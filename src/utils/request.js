import axios from 'axios';
axios.defaults.withCredentials=true;

const request = axios.create({
    baseURL:'http://120.25.229.45:5000'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;
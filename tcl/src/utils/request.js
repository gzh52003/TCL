import axios from 'axios';
axios.defaults.withCredentials=true;
const baseURL = process.env.NODE_ENV==='development' ? 'http://localhost:5000':'http://120.25.229.45:5000'
const request = axios.create({
    baseURL:baseURL
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;
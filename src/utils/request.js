import axios from 'axios';

const request = axios.create({
    baseURL:'http://localhost:5000'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;
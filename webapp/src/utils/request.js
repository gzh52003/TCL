import axios from "axios";

const request = axios.create({
<<<<<<< HEAD
    baseURL:'http://120.25.229.45:5000',
    withCredentials:true
=======
    baseURL: "http://localhost:2003/api",
    withCredentials: true,
>>>>>>> fda6095b8ebe9316835f613d92ac59752adc05ca
});

export default request;
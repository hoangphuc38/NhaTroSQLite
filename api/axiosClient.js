import axios from 'axios';

//let token = localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: 'https://9d7e-2402-800-6310-eead-3986-6a1-c6b5-ba4e.ngrok-free.app/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here
    // if (token && config.headers) {
    //     config.headers.Authorization = token;
    //     return config;
    // }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    //Handle errors;
    throw error;
})

export default axiosClient;
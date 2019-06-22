import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

    if (!expectedError) {
        
    }

    return Promise.reject(error)
})

const http = axios.create({
    baseURL: "http://localhost:3000/api"
})

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
}
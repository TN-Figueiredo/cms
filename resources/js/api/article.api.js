// Http Requests
import http from "../shared/http";

const apiEndpoint = "/article"

export const getAllArticles = () => {
    return http.post(`${apiEndpoint}`)
}
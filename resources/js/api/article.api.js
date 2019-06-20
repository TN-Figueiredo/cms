// Http Requests
import http from "../shared/http";

const apiEndpoint = "/article";

export const getAllArticles = () => {
    return http.get(`${apiEndpoint + "s"}`);
};

export const postNewArticle = (data) => {
    return http.post(`${apiEndpoint}`, data)
}
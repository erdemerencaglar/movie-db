import axios from "axios";

const axiosInstance =  axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

const axiosInstanceImg =  axios.create({
    baseURL: "https://image.tmdb.org/t/p/original/"
});

export { axiosInstance, axiosInstanceImg } ;
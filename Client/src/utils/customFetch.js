import axios from "axios";

//using customFetch will already have the base url
const customFetch = axios.create({
    baseURL: "/api/v1"
})

export default customFetch
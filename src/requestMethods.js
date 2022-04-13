import axios from "axios";

const BASE_URL = "https://stack-up-app.herokuapp.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});



import axios from "axios";

const BASE_URL = "https://stackup-server.onrender.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});



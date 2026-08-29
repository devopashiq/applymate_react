import axios from "axios";

const baseURL = "http://localhost:7000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});


export const refreshApi = axios.create({
  baseURL,
  withCredentials:true
})

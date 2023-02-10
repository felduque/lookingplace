import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000";

export default axios.create({
  baseURL: BASE_URL,
});

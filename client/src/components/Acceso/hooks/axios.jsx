import axios from "axios";
const BASE_URL = "https://looking.fly.dev";

export default axios.create({
  baseURL: BASE_URL,
});

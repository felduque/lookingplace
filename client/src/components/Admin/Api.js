import axios from "axios";

export function getAllUsers() {
  try {
    const result = axios.get("http://localhost:3000/client/getuser");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getUserById(id) {
  try {
    const result = axios.get(`http://localhost:3000/client/getuser/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

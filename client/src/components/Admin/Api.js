import axios from "axios";

export function getAllUsers() {
  try {
    const result = axios.get("http://localhost:3000/client/getuser");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateClient(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/client/updateuser/${id}`,
      data,
      {
        // Heaaders que acepte files y array que se pasen con datos
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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

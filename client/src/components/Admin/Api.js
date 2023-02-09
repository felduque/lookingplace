import axios from "axios";

export function getAllUsers() {
  try {
    const result = axios.get("https://looking.fly.dev/client/getuser");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateClient(id, data) {
  try {
    const result = axios.patch(
      `https://looking.fly.dev/client/updateuser/${id}`,
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
    const result = axios.get(`https://looking.fly.dev/client/getuser/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

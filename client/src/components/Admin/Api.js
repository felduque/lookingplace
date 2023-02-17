import axios from "axios";

const url = "http://localhost:3000";

export function getAllUsers() {
  try {
    const result = axios.get(`${url}/client/getuser`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateClient(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/client/updateuser/${id}`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function allPropierties() {
  try {
    const result = axios.get("http://localhost:3000/properties");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateAvatar(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/client/updateavatar/${id}`,
      data,
      {
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

export function getAllTenants() {
  try {
    const result = axios.get("http://localhost:3000/tenant/gettenant");
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

export function getTenantById(id) {
  try {
    const result = axios.get(`http://localhost:3000/tenant/gettenant/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateTenant(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/tenant/updatetenant/${id}`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateAvatarTenant(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/tenant/updateavatar/${id}`,
      data,
      {
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

export function deleteClient(id) {
  try {
    const result = axios.delete(
      `http://localhost:3000/client/deleteuser/${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function deleteProperty(id) {
  try {
    const result = axios.delete(`http://localhost:3000/property/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function deleteTenant(id) {
  try {
    const result = axios.delete(
      `http://localhost:3000/tenant/deletetenant/${id}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getPropertyByid(id) {
  try {
    const result = axios.get(`http://localhost:3000/property/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updatePropery(id, data) {
  try {
    const result = axios.patch(
      `http://localhost:3000/property/edit/${id}`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function deleteComment(id) {
  try {
    const result = axios.delete(`http://localhost:3000/comment/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

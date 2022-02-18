import axios from "axios";

export default class ToDoListService {
  static async getAll(currentUser) {
    const responce = await axios.get("http://localhost:3001/tasks", {
      params: {
        userName: currentUser,
      },
    });

    return responce;
  }

  static async createTask(newItem) {
    await axios.post("http://localhost:3001/tasks", newItem);
  }

  static async deleteTask(id) {
    await axios.delete(`http://localhost:3001/tasks/` + id);
  }

  static async upTask(id) {
    const responce = await axios.get(`http://localhost:3001/tasks/` + id);
    responce.data.completed = !responce.data.completed;
    await axios.put(`http://localhost:3001/tasks/` + id, responce.data);
  }
}

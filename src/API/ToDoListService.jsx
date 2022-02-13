import axios from "axios";

export default class ToDoListService {
  static async getAll(currentUser) {
    const responce = await axios.get(
      "https://jsonplaceholder.typicode.com/todos", {
        params: {
          _userid: currentUser
        }
      }
    );
   
    return responce;
  }
}

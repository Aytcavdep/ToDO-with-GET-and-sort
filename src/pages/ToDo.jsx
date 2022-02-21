import { useEffect, useMemo, useState } from "react";
import ToDOList from "../ToDOList";
import TForm from "../TForm";
import ToDoListService from "../API/ToDoListService";
import Loader from "../UI/Loader";
import { useFetching } from "../hooks/useFetching";
import Login from "./Login";
import axios from "axios";
import MySelect from "../UI/MySelect";
import TodoFilter from "../UI/TodoFilter";

let dateNew = "";
function ToDo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const sortedTodos = useMemo(() => {
    console.log("отработала функция");
    if (filter.sort) {
      return [...todos].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return todos;
  }, [filter.sort, todos]);

  const sortedAndSearchedTodos = useMemo(() => {
    return sortedTodos.filter((todo) => todo.date.includes(filter.query));
  }, [filter.query, sortedTodos]);

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("userName")
  );
  const addDate = (dateForm) => {
    dateNew = dateForm;
  };

  const addTitle = (userInput) => {
    if (userInput && dateNew) {
      console.log(dateNew);
      const newItem = {
        userName: localStorage.getItem("userName"),
        id: Math.random().toString(36).substring(2, 9),
        title: userInput,
        completed: false,
        date: dateNew,
      };
      setTodos([...todos, newItem]);

      ToDoListService.createTask(newItem);
    }
  };

  const [fetchToDo, isToDoLoading, toDoError] = useFetching(
    async (currentUser) => {
      const responce = await ToDoListService.getAll(currentUser);
      setTodos([
        ...todos,
        ...responce.data /*.filter((todo) => todo.userName == currentUser)*/,
      ]);
    }
  );

  useEffect(() => {
    fetchToDo(localStorage.getItem("userName"));
  }, [localStorage.getItem("userName")]);

  const removeTitle = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
    ToDoListService.deleteTask(id);
  };

  const handleChangeCompleted = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
    ToDoListService.upTask(id);
  };

  const date = new Date();
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  year = year.toString().slice(-2);
  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;

  return (
    <div className="App">
      <header>
        <h1>
          {localStorage.getItem("userName")} <br />
          Список задач {dayOfMonth}.{month}.{year}
        </h1>
      </header>
      <TForm addTitle={addTitle} addDate={addDate} />
      <h1>Задачи: {todos.length}</h1>
      <hr style={{ margin: "15 px 0" }} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      {sortedAndSearchedTodos.map((todo) => {
        if (!todo.completed) {
          return (
            <ToDOList
              todo={todo}
              key={todo.id}
              removeTitle={removeTitle}
              handleChangeCompleted={handleChangeCompleted}
            />
          );
        }
      })}

      {sortedAndSearchedTodos.map((todo) => {
        if (todo.completed) {
          return (
            <ToDOList
              todo={todo}
              key={todo.id}
              removeTitle={removeTitle}
              handleChangeCompleted={handleChangeCompleted}
            />
          );
        }
      })}
      {isToDoLoading && (
        <div
          style={{ display: "grid", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}
export default ToDo;

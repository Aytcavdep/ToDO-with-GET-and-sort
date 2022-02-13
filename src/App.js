import { useEffect, useState } from "react";
import ToDOList from "./ToDOList";
import TForm from "./TForm";
import ToDoListService from "./API/ToDoListService";
import Loader from "./UI/Loader"
import { useFetching } from "./hooks/useFetching";

function App() {
  const [todos, setTodos] = useState([]);

  const [currentUser, setCurrentUser] = useState(10)

  const addTitle = (userInput) => {
    if (userInput) {
      const newItem = {
        userId: currentUser,
        id: Math.random().toString(36).substring(2, 9),
        title: userInput,
        completed: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const [fetchToDo, isToDoLoading, toDoError] = useFetching (
    async (currentUser) => {
    const responce =  await ToDoListService.getAll(currentUser);
    setTodos([...todos, ...responce.data.filter((todo) => todo.userId == currentUser)]);
    
    }
    
  )

  useEffect (() => {
    fetchToDo(currentUser);},
    [currentUser])
  

  


  const removeTitle = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleChangeCompleted = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ]);
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
          Список задач {dayOfMonth}.{month}.{year}
        </h1>
      </header>
      <TForm addTitle={addTitle} />
      <h1>Задачи: {todos.length}</h1>
      {todos.map((todo) => {
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

      {todos.map((todo) => {
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
      {isToDoLoading &&
      <div style={{display: 'grid', justifyContent: 'center', marginTop: 50}}>
        <Loader/>
      </div>
      }
    </div>
  );
}
export default App;

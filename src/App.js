import { useEffect, useState } from "react";
import ToDOList from "./ToDOList";
import TForm from "./TForm";
import ToDoListService from "./API/ToDoListService";
import Loader from "./UI/Loader";
import { useFetching } from "./hooks/useFetching";
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./router/index";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/index";
import Navbar from "./UI/Navbar";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;

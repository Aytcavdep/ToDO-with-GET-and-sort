import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/index";
import ToDo from "../pages/ToDo"

import "./Login.css";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { isAuth, setIsAuth } = useContext(AuthContext);

 const onSubmit = (data) => {
    console.log(data);
    setIsAuth(true);
    localStorage.setItem("auth", "true");
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("password", data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("password")} placeholder="Введите пароль" />
      <select {...register("userName")}>
        <option value="Vladimir">Vladimir</option>
        <option value="Valdemar">Valdemar</option>
      </select>
      <input type="submit" />
    </form>
  );
}

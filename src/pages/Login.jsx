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
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("firstName", data.firstName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="Введите имя" />
      <select {...register("userId")}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input type="submit" />
    </form>
  );
}

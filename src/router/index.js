import Login from "../pages/Login";
import ToDo from "../pages/ToDo";

export const privateRoutes = [
  { path: "/todolist", element: <ToDo />, exact: true },
  { path: "*", element: <ToDo />, exact: true },
];

export const publicRoutes = [
  { path: "/login", element: <Login />, exact: true },
  { path: "*", element: <Login />, exact: true },
];

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/index";
import { Form, Input, Button, Checkbox } from "antd";
import ToDoListService from "../API/ToDoListService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../UI/Loader";
import { message } from "antd";

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [loginUser, setLoginUser] = useState("");

  const [fetchRegisterUser, isUserLoading, userError] = useFetching(
    async (currentUser) => {
      const responce = await ToDoListService.loginUser(currentUser);
      setLoginUser(responce.data);
    }
  );

  useEffect(() => {
    fetchRegisterUser();
    return setLoginUser("");
  }, []);

  const loginError = () => {
    message.error("Пользователь с таким именем не существует");
  };
  const passwordError = () => {
    message.error("Неверный пароль");
  };

  const onSubmit = (values) => {
    let userFind =
      loginUser.find((item) => item.userName == values.username) || false;
    if (!userFind) {
      return loginError();
    } else if (
      userFind.password ? userFind.password === values.password : false
    ) {
      setIsAuth(true);
      localStorage.setItem("auth", "true");
      localStorage.setItem("userName", values.username);
      localStorage.setItem("password", values.password);
      setLoginUser("");
    } else {
      return passwordError();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return isUserLoading ? (
    <div style={{ display: "grid", justifyContent: "center", marginTop: 50 }}>
      <Loader />
    </div>
  ) : (
    <div>
      <Form
        style={{
          width: "550px",
          margin: "50px auto",
          borderRadius: "4px",
          border: "2px solid #b0afb3",
        }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{
            margin: "20px 10px",
          }}
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{
            margin: "20px 10px",
          }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", fontSize: 18 }}>
        *Login and password: Vladimir or Valdemar
      </div>
    </div>
  );
}

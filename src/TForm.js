import { useState } from "react";
import { DatePicker, Space, Button, Input } from "antd";
import "antd/dist/antd.css";
import { CheckCircleTwoTone } from "@ant-design/icons";

function TForm({ addTitle, addDate }) {
  const [userInput, setUserInput] = useState("");
  const [dateForm, setAddDate] = useState("");

  const saveKeyInput = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    addDate(dateForm);
    addTitle(userInput);
    setUserInput("");
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      submitForm(e);
    }
  };

  function setDate(date, dateString) {
    setAddDate(dateString);
  }

  return (
    <form
      style={{
        display: "grid",
        gridTemplateColumns: 475,
        justifyItems: "center",
        rowGap: 25,
      }}
      onSubmit={submitForm}
    >
      <Input
        value={userInput}
        type="text"
        onChange={saveKeyInput}
        onKeyDown={pressEnter}
        placeholder="Введите задачу..."
      />
      <Space direction="vertical">
        <DatePicker onChange={setDate} />
      </Space>
      <Button
        icon={<CheckCircleTwoTone />}
        style={{ width: 150 }}
        htmlType="submit"
      >
        Сохранить
      </Button>
    </form>
  );
}

export default TForm;

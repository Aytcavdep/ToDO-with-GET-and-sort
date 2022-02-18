import { useState } from "react";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

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
    <form onSubmit={submitForm}>
      <input
        value={userInput}
        type="text"
        onChange={saveKeyInput}
        onKeyDown={pressEnter}
        placeholder="Введите задачу..."
      />
      <Space direction="vertical">
        <DatePicker onChange={setDate} />
      </Space>
      <button>Сохранить</button>
    </form>
  );
}

export default TForm;

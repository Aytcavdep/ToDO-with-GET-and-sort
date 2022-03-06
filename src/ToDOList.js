import { CloseCircleTwoTone } from "@ant-design/icons";

function ToDOList({ todo, handleChangeCompleted, removeTitle }) {
  const { id, title, completed, userName, date } = todo;

  const dateNow = new Date();
  let dayOfMonth = dateNow.getDate();
  let month = dateNow.getMonth() + 1;
  let year = dateNow.getFullYear();
  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
  let dateOn = `${year}-${month}-${dayOfMonth}`;
  let dateOff = `${year}-${month}-${Number(dayOfMonth) + 7}`;

  const handleRemove = () => {
    removeTitle(id);
  };
  return (
    <div
      key={id}
      className={`${
        dateOn <= date && date <= dateOff
          ? "item-todo item-week"
          : date <= dateOn
          ? "item-todo item-lost"
          : "item-todo"
      }
    ${completed ? "item-todo item-completed" : ""}`}
    >
      <div
        className={completed ? "item-text strike" : "item-text"}
        onClick={() => handleChangeCompleted(id)}
        style={{
          display: "grid",
          justifyContent: "space-between",
          gridTemplateColumns: "200px 200px",
        }}
      >
        <div style={{ justifySelf: "left" }}>{date}</div>
        <div style={{ justifySelf: "right" }}>{userName}</div>
      </div>
      {title}

      <div className="item-delete" onClick={handleRemove}>
        <CloseCircleTwoTone />
      </div>
    </div>
  );
}

export default ToDOList;

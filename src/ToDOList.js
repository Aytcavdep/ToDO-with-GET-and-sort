import TForm from "./TForm";

function ToDOList({ todo, handleChangeCompleted, removeTitle }) {
  const { id, title, completed, userName, date } = todo;
  const handleRemove = () => {
    removeTitle(id);
  };
  return (
    <div key={id} className="item-todo">
      <div
        className={completed ? "item-text strike" : "item-text"}
        onClick={() => handleChangeCompleted(id)}
      >
        {date} <br />
        {userName} <br />
        {title}
      </div>

      <div className="item-delete" onClick={handleRemove}>
        X
      </div>
    </div>
  );
}

export default ToDOList;

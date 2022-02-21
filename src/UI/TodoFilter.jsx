import MySelect from "./MySelect";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Сортировка по..."
        options={[
          { value: "date", name: "По дате" },
          { value: "title", name: "По содержанию" },
        ]}
      />
    </div>
  );
};

export default TodoFilter;

import MySelect from "./MySelect";
import { Button, DatePicker, Space, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TodoFilter = ({ filter, setFilter }) => {
  function setDateOn(date, dateString) {
    setFilter({ ...filter, queryOn: dateString });
  }
  function setDateOff(date, dateString) {
    setFilter({ ...filter, queryOff: dateString });
  }

  return (
    <div>
      <div>
        <h2>Фильтр по дате</h2>
        <br />
        <Space direction="vertical">
          <DatePicker onChange={setDateOn} />
        </Space>
        <br />
        <Space direction="vertical">
          <DatePicker onChange={setDateOff} />
        </Space>
      </div>
      <br />

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

import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;


const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <Select showSearch
    size='small'
    allowClear='true'
    placeholder="Выберете тип сортировки"
    optionFilterProp="children"
    value={value} onChange={(value) => onChange(value)}>
    <Option defaultActiveFirstOption="true" disabled value="">
    {defaultValue}
    </Option>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};












export default MySelect;

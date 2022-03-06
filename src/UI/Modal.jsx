import 'antd/dist/antd.css';
import { Modal} from 'antd';

const Modalwindow = ({ children, visible, setVisible }) => {
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal footer={null} title="Создать задачу" visible={visible} onOk={handleOk} onCancel={handleCancel}>
    
        {children}
      
    </Modal>
  );
};





export default Modalwindow;

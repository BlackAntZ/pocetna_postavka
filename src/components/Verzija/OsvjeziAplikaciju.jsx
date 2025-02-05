import {Modal} from "antd";
import PropTypes from "prop-types";

const OsvjeziAplikaciju = ({open, closeModal}) => {
  return (
    <Modal title={'Izašla je nova verzija aplikacije.'} okText={'Osvježi'} footer={(_, {OkBtn}) => <OkBtn/>} open={open}
           onCancel={closeModal} maskClosable={true} onOk={() => window.location.reload()}>
    </Modal>
  );
};

OsvjeziAplikaciju.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default OsvjeziAplikaciju;
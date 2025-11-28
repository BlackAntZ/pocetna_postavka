import {Modal} from "antd";
import {useContext} from "react";
import {LoginContext} from "../../store/login-context.jsx";

const ApplicationRefresh = () => {
  const {applicationRefresh} = useContext(LoginContext);

  return (
    <Modal title={'Izašla je nova verzija aplikacije.'} okText={'Osvježi'} footer={(_, {OkBtn}) => <OkBtn/>} open={applicationRefresh}
           maskClosable={false} onOk={() => window.location.reload()}>
    </Modal>
  );
};

export default ApplicationRefresh;
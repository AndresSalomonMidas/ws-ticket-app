import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useSidebar } from "../hooks/useSidebar";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

const CreateTicketPage = () => {
  useSidebar(false);
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const getNewTicket = () => {
    /*
      socket.emit has 3 arguments:

      1. Event name
      2. Data to be sent
      3. Callback to be executed by the server and send data back
    */
    socket.emit("get-new-ticket", null, (ticket) => {
      // Argument "ticket" is the one generated on the server
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Get new ticket</Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={getNewTicket}
          >
            New ticket
          </Button>
        </Col>
      </Row>
      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Your number is</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateTicketPage;

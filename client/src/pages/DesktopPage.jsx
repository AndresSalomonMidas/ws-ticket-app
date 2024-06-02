import { useContext, useState } from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import { RightOutlined } from "@ant-design/icons";
import { useSidebar } from "../hooks/useSidebar";
import { getUserStorage } from "../helpers/getUserStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

const DesktopPage = () => {
  useSidebar(true);
  const [user] = useState(getUserStorage());
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const logout = () => {
    localStorage.clear();

    navigate("/login", { replace: true });
  };

  const nextTicket = () => {
    socket.emit("next-ticket", user, (ticket) => {
      // "ticket" argument is fulfilled by the server
      setTicket(ticket);
    });
  };

  if (!user.name || !user.desktop) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.name}</Title>
          <Text>You are working on desktop: </Text>
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={4} align="right">
          <Button
            shape="round"
            type="primary"
            danger
            onClick={logout}
            icon={<CloseCircleOutlined />}
          >
            Logout
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Working on ticket: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            shape="round"
            type="primary"
            onClick={nextTicket}
            icon={<RightOutlined />}
          >
            Next ticket
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DesktopPage;

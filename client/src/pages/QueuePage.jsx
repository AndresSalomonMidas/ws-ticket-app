import { Typography, Row, Col, List, Card, Tag, Divider } from "antd";
import { useSidebar } from "../hooks/useSidebar";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getLast13Tickets } from "../helpers/getLast13Tickets";

const { Title, Text } = Typography;

const QueuePage = () => {
  useSidebar(false);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getLast13Tickets()
      .then((data) => {
        setTickets(data.tickets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    socket.on("ticket-assigned", (tickets) => {
      setTickets(tickets);
    });

    return () => {
      socket.off("ticket-assigned");
    };
  }, [socket]);

  return (
    <>
      <Title level={1}>Client being attended</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano" key={item.number}>
                      {item.name}
                    </Tag>,
                    <Tag color="magenta" key={item.number}>
                      Desktop: {item.desktop}
                    </Tag>,
                  ]}
                >
                  <Title>Ticket #{item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket #${item.number}`}
                  description={
                    <>
                      <Text type="secondary">Desktop: </Text>
                      <Tag color="magenta">{item.desktop}</Tag>
                      <Text type="secondary">Agent: </Text>
                      <Tag color="volcano">{item.name}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default QueuePage;

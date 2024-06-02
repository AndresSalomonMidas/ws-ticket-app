import { useState } from "react";
import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate, Navigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import { getUserStorage } from "../helpers/getUserStorage";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [user] = useState(getUserStorage());
  const navigate = useNavigate();

  useSidebar(true);

  const onFinish = ({ name, desktop }) => {
    localStorage.setItem("name", name);
    localStorage.setItem("desktop", desktop);

    navigate("/desktop");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user.name && user.desktop) {
    // If the user is already logged in, redirect to the desktop page
    return <Navigate to={"/desktop"} />;
  }

  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Enter your name and desktop number</Text>

      <Divider />

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Please input your desktop number!",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginPage;

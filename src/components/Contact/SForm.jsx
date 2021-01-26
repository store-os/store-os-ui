import React from "react";
import { Form, Input, Button, Col, Typography } from "antd";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} requerido!",
  types: {
    email: "${label} no es un correo correcto!",
  },
};

const SForm = ({ data }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Col span={10} offset={2}>
      {data.title !== "" && <Title level={3}>{data.title}</Title>}

      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ width: "100%" }}
      >
        <Form.Item
          name={["user", "name"]}
          label={data.name.label}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={data.name.placeholder} />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label={data.email.label}
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input placeholder={data.email.label} />
        </Form.Item>

        <Form.Item
          name={["user", "introduction"]}
          label={data.message.label}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea placeholder={data.message.placeholder} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {data.submit}
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SForm;

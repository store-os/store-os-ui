import React from "react";
import { Form, Input, Button, Col } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SMailchimp = ({ status, message, className, style, onSubmitted }) => {
   
    let input;
   const [form] = Form.useForm();
   const submit = () =>
    form.item &&
    form.item.value.indexOf("@") > -1 &&
    onSubmitted({
      EMAIL: form.item.value
    });
   

  const onFinish = (values) => {
    console.log(values);
    onSubmitted({EMAIL:values.email})
  };

  return (
    <Col span={200} offset={0}>
      <Form form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ width: "100%" }}
      >
        <Form.Item
        name = "email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input placeholder="Únete a nuestra newsletter. Introduce tu email" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" onClick={submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SMailchimp;

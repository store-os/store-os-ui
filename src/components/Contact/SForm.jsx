import React, { useState }  from "react";
import { Form, Input, Button, Col, Typography } from "antd";
import axios from 'axios'
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

  const [status, setStatus] = useState({
    info: { error: false, msg: null }
  })

  const onFinish = (values) => {
    console.log(values);
    axios({
      method: 'POST',
      url: data.formspree,
      data: values
    })
      .then(response => {
        setStatus({
         
          info: { error: false, msg: data.success }
        })
       
        
      })
      .catch(error => {
        setStatus({
         
          info: { error: true, msg: error.response.data.error }
        })
        
        
      })
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
          name={["user", "message"]}
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
      {status.info.error && (
        <div className="error">Error: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
    </Col>
  );
};

export default SForm;

import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useViewport, DESKTOP } from "../hooks/useViewPort.jsx";


const { Option } = Select;

const validateMessages = {
  required: "${label} requerido!",
  types: {
    email: "${label} no es un correo correcto!",
  },
};

const SDrawerForm = ({
  data,
  product_id,
  triggerType = "primary"
}) => {
  const [status, setStatus] = useState({
    visible: false,
    info: { error: false, msg: null },
  });

  let viewport = useViewport();

  const showDrawer = () => {
    setStatus({ visible: true });
  };

  const onClose = () => {
    setStatus({ visible: false });
  };

  const onFinish = (values) => {
    console.log(values);
    axios({
      method: "POST",
      url: data.formspree,
      data: values,
    })
      .then((response) => {
        setStatus({
          info: { error: false, msg: data.success },
        });
      })
      .catch((error) => {
        setStatus({
          info: { error: true, msg: error.response.data.error },
        });
      });
  };

  return (
    <React.Fragment>
      <Button type={triggerType} onClick={showDrawer}>
        <InfoCircleOutlined /> {data.button_name}
      </Button>
      <Drawer
        title={data.title}
        width={viewport.device === "TABLET"
        ? "80%"
        : viewport.device === "MOBILE"
        ? "100%"
        : "50%"}
        onClose={onClose}
        visible={status.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              {data.button_cancel}
            </Button>
            <Button onClick={onClose} type="primary">
              {data.button_accept}
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ 
            width: "100%"
           }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["user", "name"]}
                label={data.name.label}
                rules={[{ required: true, message: data.name.placeholder }]}
              >
                <Input placeholder={data.name.placeholder} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["user", "email"]}
                label={data.email.label}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: data.email.placeholder,
                  },
                ]}
              >
                <Input
                  style={{ width: "100%"}}
                  placeholder={data.email.label}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["user", "product_ID"]}
                label={data.product.label}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder={product_id}
                  disabled={true}
                  value={product_id}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["user", "question_type"]}
                label={data.question_type.label}
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder={data.question_type.placeholder}>
                  <Option value={data.question_type.option1}>
                    {data.question_type.option1}
                  </Option>
                  <Option value={data.question_type.option2}>
                    {data.question_type.option2}
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={["user", "comentario"]}
                label={data.comentario.label}
                rules={[
                  {
                    required: true,
                    message: data.comentario.placeholder,
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder={data.comentario.placeholder}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </React.Fragment>
  );
};

export default SDrawerForm;

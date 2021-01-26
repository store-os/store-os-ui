import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const key = "added-to-cart";

const openNotification = (productName) => {
  notification.info({
    key,
    message: "New product added to cart",
    description: (
      <div>
        <strong>{productName}</strong> was added to cart.
      </div>
    ),
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

export default openNotification;
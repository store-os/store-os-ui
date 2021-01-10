import { Row, Col, Space, Statistic } from "antd";

const StatisticsSection = () => {
  const statistics = [
    {
      title: "Años de experiencia",
      value: 24,
    },
    {
      title: "Productos en stock",
      value: "+500",
    },
    {
      title: "Máquinas reparadas",
      value: "+1000",
    },
  ];

  return (
    <Row
      style={{
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      {statistics.length > 0 &&
        statistics.map((statistic, index) => {
          return (
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 4 }}>
              <Space size="middle" align="center">
                <Statistic title={statistic.title} value={statistic.value} />
              </Space>
            </Col>
          );
        })}
    </Row>
  );
};

export default StatisticsSection;

import { Row, Col, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;


const IntroductionSection = ({data}) => {
  
  return (
    <Row
      style={{
        marginRight: -24,
        marginLeft: -24,
        paddingTop: 64,
        paddingBottom: 64,
        paddingRight: 24,
        paddingLeft: 24,
        backgroundColor: "lightgrey",
      }}
    >
      {data.paragraph.length > 0 &&
      data.paragraph.map((par, index) => {
        return(
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Space direction="vertical">
              <Paragraph>{par.title_1}</Paragraph>
              <Title level={3}>
                {par.title_2}
              </Title>
              <Paragraph>
                <blockquote>
                  {par.description}
                </blockquote>
              </Paragraph>
            </Space>
          </Col>
        )
       })}
    </Row>
  );
 
};

export default IntroductionSection;

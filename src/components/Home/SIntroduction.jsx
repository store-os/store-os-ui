import { Row, Col, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const IntroductionSection = () => {
  return (
    <Row
      style={{
        marginRight: -150,
        marginLeft: -150,
        paddingTop: 64,
        paddingBottom: 64,
        backgroundColor: "lightgrey",
      }}
    >
      <Col xs={{ span: 12, offset: 1 }} lg={{ span: 12, offset: 6 }}>
        <Space direction="vertical">
          <Paragraph>Distribuidor oficial Kärcher en Asturias</Paragraph>
          <Title level={3}>
            Comercial Alchersán haciendo haciendo tu trabajo más fácil
          </Title>
          <Paragraph>
            <blockquote>
              Comercial Alchersán nace en 1997 con la intención de hacer llegar
              al mercado asturiano los productos Kärcher y de prestar un
              servicio profesional acorde a la calidad de la marca. Todos estos
              años de experiencia han servido para asentar a Kärcher en el día a
              día de particulares y empresas. Como distribudor oficial de la
              marca Kärcher, nos sentimos sensibilizados por el medio ambiente,
              por ello reciclamos la basura generada así como reciclaje de agua
              dentro de nuestras instalaciones. Con el tiempo hemos conseguido
              apoyar y formar parte del deporte patrocinando diversos eventos
              deportivos, como fútbol, Colloto S.D., pruebas ciclistas y la
              prueba automovilística de mayor prestigio en Asturias, el Rally
              Princesa de Asturias.
            </blockquote>
          </Paragraph>
        </Space>
      </Col>
    </Row>
  );
};

export default IntroductionSection;

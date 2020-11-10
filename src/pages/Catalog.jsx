import SCard from "../components/SCard";
import cardPreview from "../images/card-img.png";

const Catalog = () => {
  return (
    <SCard
      title="Zapatillas casual de hombre React Element 55 Nike"
      brand="Nike"
      hoverable={true}
      price="32€"
      cover={cardPreview}
      hasStock={true}
      details='Free shipping or pick up'
    ></SCard>
  );
};

export default Catalog;

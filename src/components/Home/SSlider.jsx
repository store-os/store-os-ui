import { Carousel } from "antd";
import styled from "styled-components";
import Slider1 from "../../images/karcher_slider_1.jpg";
import Slider2 from "../../images/karcher_slider_2.jpg";
import Slider3 from "../../images/karcher_slider_3.jpg";
import { useViewport, DESKTOP } from "../../hooks/useViewPort.jsx";

const SliderSection = () => {
  const slider = [Slider1, Slider2, Slider3];
  let viewport = useViewport();
  return (
    <Carousel>
      {slider.length > 0 &&
        slider.map((slide, index) => {
          return (
            <div>
              <SliderImage
                src={slide}
                key={index}
                style={{
                  height: viewport.device === DESKTOP ? "80vh" : "40vh",
                }}
              />
            </div>
          );
        })}
    </Carousel>
  );
};

const SliderImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default SliderSection;

import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import CarouselColumn from "./CarouselColumn";

export default function PokemonsColection(props) {
  let slides = [];
  for (let i = 0; i < 516; i += 12) {
    slides.push(props.pokemonColection.slice(i, i + 12));
  }

  return (
    <div className="main-carousel-div">
      <Carousel style={{ width: "150vw" }}>
        {slides?.map((slide, index) => (
          <Carousel.Item interval={5000}>
            <div className="main-carousel-itervals">
              {(() => {
                let columnsArr = [];
                for (let i = 0; i < slide.length; i += 3) {
                  columnsArr.push(slide.slice(i, i + 3));
                }
                return columnsArr?.map((column, index) => (
                  <CarouselColumn
                    key={index}
                    column={column}
                    onClick={props.onClick}
                  />
                ));
              })()}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

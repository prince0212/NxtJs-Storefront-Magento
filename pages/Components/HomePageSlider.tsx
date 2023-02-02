import Image from "next/image";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "react-awesome-slider/dist/styles.css";

var settings = {
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  swipeToSlide: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function HomePageSlider(props: any) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
      bullets={false}
      className="mt-2" 
    >
      {props.sliderArray.map((item: any, index: number) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div data-src={process.env.domain + "media/" + `${item.image}`}></div>
        );
      })}
    </AutoplaySlider>
  );
}
export default HomePageSlider;

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  return (
    <Slider {...settings}>
      {props.sliderArray.map((item: any, index: number) => {
        return (
          <>
            <div>
              <Image
                src={process.env.domain + "media/" + `${item.image}`}
                alt="Picture of the author"
                width={1440}
                height={660}
              />
            </div>
          </>
        );
      })}
    </Slider>
  );
}
export default HomePageSlider;

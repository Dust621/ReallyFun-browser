import React, { Component } from "react";
import { Swiper, SwiperSlide, Autoplay, Pagination, Navigation, Thumbs } from "swiper";
import "swiper/swiper-bundle.min.css";

Swiper.use([Navigation, Pagination, Autoplay, Thumbs]);

export default class ReactSwiper extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { list: ["111", "222", "333"] };
  // }

  componentDidMount() {
    /* eslint-disable */
    new Swiper(
      ".swiper-container",
      {
        autoplay: { disableOnInteraction: false },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
      }
      // "#thumbs",
      // {
      //   spaceBetween: 10,
      //   slidesPerView: 4,
      //   watchSlidesVisibility: true, //防止不可点击
      // }
    );
  }
  render() {
    return (
      <div
        className="swiper-container"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ width: "100%", height: "200px" }}
      >
        <div className="swiper-wrapper">
          {/* {this.state.list.map((item) => (
            <div className="swiper-slide" key={item}>
              {item}
            </div>
          ))} */}
          {this.props.children}
        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    );
  }
}

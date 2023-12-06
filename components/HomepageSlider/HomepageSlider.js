import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./HomepageSlider.module.scss";
// import { useMediaQuery } from "react-responsive";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FeaturedImage } from "..";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

let cx = className.bind(styles);

export default function HomepageSlider({ homepageSlides }) {
  return (
    <div className={cx("component")}>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          effect={"fade"}
          // autoplay={{
          //   delay: 15000,
          //   disableOnInteraction: false,
          // }}
          loop={true}
          pagination={{
            el: ".swiper-custom-pagination",
            clickable: "true",
            type: "bullets",
          }}
          navigation={{
            prevEl: ".swiper-custom-button-prev",
            nextEl: ".swiper-custom-button-next",
          }}
          modules={[EffectFade, Autoplay, Pagination, Navigation]}
          className="fw-swiper-wrapper"
        >
          {homepageSlides?.map((homepageSlide, index) => (
            <SwiperSlide key={index}>
              <div className={cx("slide-wrapper")}>
                <Link href={homepageSlide?.url}>
                  <Image
                    src={homepageSlide?.featuredImage?.node?.sourceUrl}
                    altText={homepageSlide?.featuredImage?.node?.altText}
                    className={cx("featured-image")}
                    fill
                    sizes="100%"
                  />
                  {/* <div className={cx("excerpt-wrapper")}>
                    {homepageSlide?.excerpt}
                  </div>
                  <div className={cx("bottom-gradient")}></div> */}
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-custom-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
            >
              <rect width="65" height="65" fill="black" />
              <path d="M45 12L21 31L45 49" stroke="white" stroke-width="3" />
            </svg>
          </div>
          <div className="swiper-custom-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
            >
              <rect
                x="65"
                y="65"
                width="65"
                height="65"
                transform="rotate(-180 65 65)"
                fill="black"
              />
              <path d="M20 53L44 34L20 16" stroke="white" stroke-width="3" />
            </svg>
          </div>
        </Swiper>
        <div className="swiper-custom-pagination"></div>
      </div>
    </div>
  );
}

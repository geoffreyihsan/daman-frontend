import React, { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./HeroSlider.module.scss";
import { useQuery } from "@apollo/client";
import { GetHeroSlider } from "../../queries/GetHeroSlider";
import { FormatDate } from "../../components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

let cx = className.bind(styles);

export default function HeroSlider({ databaseId }) {
  // Get DAMAN TV Videos
  const { data, loading } = useQuery(GetHeroSlider, {
    variables: {
      // Homepage id
      id: databaseId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Loading Menu
  if (loading) {
    return (
      <>
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center lg:max-w-[1024px]	">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-[80vh] w-8 animate-spin fill-black text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }

  const homepageSlides = [
    {
      featuredImage: data?.page?.homepageSlider?.imageSlide1,
      uri: data?.page?.homepageSlider?.postSlide1?.uri,
      title: data?.page?.homepageSlider?.postSlide1?.title,
      excerpt: data?.page?.homepageSlider?.postSlide1?.excerpt,
      date: data?.page?.homepageSlider?.postSlide1?.date,
      author: data?.page?.homepageSlider?.postSlide1?.author?.node?.name,
    },
    {
      featuredImage: data?.page?.homepageSlider?.imageSlide2,
      uri: data?.page?.homepageSlider?.postSlide2?.uri,
      title: data?.page?.homepageSlider?.postSlide2?.title,
      excerpt: data?.page?.homepageSlider?.postSlide2?.excerpt,
      date: data?.page?.homepageSlider?.postSlide2?.date,
      author: data?.page?.homepageSlider?.postSlide2?.author?.node?.name,
    },
    {
      featuredImage: data?.page?.homepageSlider?.imageSlide3,
      uri: data?.page?.homepageSlider?.postSlide3?.uri,
      title: data?.page?.homepageSlider?.postSlide3?.title,
      excerpt: data?.page?.homepageSlider?.postSlide3?.excerpt,
      date: data?.page?.homepageSlider?.postSlide3?.date,
      author: data?.page?.homepageSlider?.postSlide3?.author?.node?.name,
    },
    {
      featuredImage: data?.page?.homepageSlider?.imageSlide4,
      uri: data?.page?.homepageSlider?.postSlide4?.uri,
      title: data?.page?.homepageSlider?.postSlide4?.title,
      excerpt: data?.page?.homepageSlider?.postSlide4?.excerpt,
      date: data?.page?.homepageSlider?.postSlide4?.date,
      author: data?.page?.homepageSlider?.postSlide4?.author?.node?.name,
    },
    {
      featuredImage: data?.page?.homepageSlider?.imageSlide5,
      uri: data?.page?.homepageSlider?.postSlide5?.uri,
      title: data?.page?.homepageSlider?.postSlide5?.title,
      excerpt: data?.page?.homepageSlider?.postSlide5?.excerpt,
      date: data?.page?.homepageSlider?.postSlide5?.date,
      author: data?.page?.homepageSlider?.postSlide5?.author?.node?.name,
    },
  ];

  const calculateTrimmedExcerpt = (excerpt) => {
    const MAX_EXCERPT_LENGTH = 150; // You can adjust this value according to your needs

    let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH);
    const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex) + "...";
    }

    return `${trimmedExcerpt}`;
  };

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
                <div className={cx("image-wrapper")}>
                  <Link href={homepageSlide?.uri}>
                    <Image
                      src={homepageSlide?.featuredImage?.sourceUrl}
                      altText={
                        homepageSlide?.featuredImage?.altText
                          ? homepageSlide?.featuredImage?.altText
                          : "slide " + index
                      }
                      className={cx("featured-image")}
                      fill
                      sizes="100%"
                    />
                  </Link>
                </div>
                <div className={cx("text-wrapper")}>
                  <div className={cx("features-wrapper")}>{"Features"}</div>
                  <div className={cx("title-wrapper")}>
                    <Link href={homepageSlide?.uri}>
                      {homepageSlide?.title}
                    </Link>
                  </div>
                  <div className={cx("excerpt-wrapper")}>
                    <Link href={homepageSlide?.uri}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: calculateTrimmedExcerpt(
                            homepageSlide?.excerpt
                          ),
                        }}
                      />
                    </Link>
                  </div>
                  <div className={cx("meta-wrapper")}>
                    {homepageSlide?.date && (
                      <time dateTime={homepageSlide?.date}>
                        <FormatDate date={homepageSlide?.date} />
                      </time>
                    )}{" "}
                    {homepageSlide?.author && (
                      <>
                        {"By "}
                        {homepageSlide?.author}
                      </>
                    )}
                  </div>
                  <div className={cx("view-more-wrapper")}>
                    <Link href={homepageSlide?.uri}>{"View More"}</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-custom-pagination"></div>
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
      </div>
    </div>
  );
}

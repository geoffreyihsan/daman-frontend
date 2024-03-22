import className from "classnames/bind";
import styles from "./ContentWrapper.module.scss";
import { Interscroller } from "../../components";
import { GetSingleTags } from "../../queries/GetSingleTags";
import { useQuery } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

let cx = className.bind(styles);

const ResponsiveComponent = ({ ComponentMobile, ComponentDesktop }) => (
  <>
    <MediaQuery maxWidth={767}>
      <ComponentMobile />
    </MediaQuery>
    <MediaQuery minWidth={768}>
      <ComponentDesktop />
    </MediaQuery>
  </>
);

export default function ContentWrapper({ content, databaseId, single }) {
  const [transformedContent, setTransformedContent] = useState("");

  useEffect(() => {
    // Function to extract image data and replace <img> with <Swiper> components
    const extractImageData = () => {
      // Create a DOMParser
      const parser = new DOMParser();

      // Parse the HTML content
      const doc = parser.parseFromString(content, "text/html");

      // Get only image elements with src containing "backend.daman.co.id"
      const imageElements = doc.querySelectorAll(
        'img[src*="backend.daman.co.id"]'
      );

      // Get elements with class 'gallery-columns-3' containing images with src containing "backend.daman.co.id"
      const galleryWrapper = doc.querySelector(".gallery.gallery-columns-3");

      if (galleryWrapper) {
        // Create an array to hold the Swiper slides
        const swiperSlides = [];

        // Get elements with class 'gallery-item' containing images with src containing "backend.daman.co.id"
        const galleryItems = galleryWrapper.querySelectorAll(
          '.gallery-item img[src*="backend.daman.co.id"]'
        );

        // Map through gallery items and generate a SwiperSlide for each item
        galleryItems.forEach((img, index) => {
          const src = img.getAttribute("src");
          const alt = img.getAttribute("alt");
          // Get the corresponding figcaption based on the index
          const figcaption =
            galleryWrapper.querySelectorAll(".gallery-caption")[index]
              ?.textContent || "";

          // Replace the <img> element with the empty string to remove it from the HTML content
          img.innerHTML = "";

          // Push the slide object into swiperSlides array
          swiperSlides.push({
            src: src,
            alt: alt,
            figcaption: figcaption,
          });
        });

        // Create the final Swiper component with all the slides
        const swiperComponent = (
          <Swiper
            effect={"fade"}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            loop={true}
            pagination={{
              el: ".swiper-custom-pagination",
              type: "fraction",
            }}
            navigation={{
              prevEl: ".swiper-custom-button-prev",
              nextEl: ".swiper-custom-button-next",
            }}
            modules={[EffectFade, Autoplay, Pagination, Navigation]}
            className="gallery-swiper-wrapper"
          >
            {swiperSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={cx("slide-wrapper")}>
                  {slide?.src && (
                    <div className={cx("image-wrapper")}>
                      <Image
                        src={slide?.src}
                        alt={
                          slide?.alt
                            ? slide?.alt
                            : "Gallery Image " + (index + 1)
                        }
                        className={cx("featured-image")}
                        width={500}
                        height={500}
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                  )}
                  {slide?.figcaption && (
                    <div className={cx("figcaption")}>{slide?.figcaption}</div>
                  )}
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
                <path d="M45 12L21 31L45 49" stroke="white" strokeWidth="3" />
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
                <path d="M20 53L44 34L20 16" stroke="white" strokeWidth="3" />
              </svg>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
          </Swiper>
        );

        // Append the Swiper component to the gallery wrapper
        const galleryWrapperContent = renderToStaticMarkup(swiperComponent);

        galleryWrapper.outerHTML = galleryWrapperContent;
      }

      // Replace <img> elements with <Image> components
      imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        const width = img.getAttribute("width");
        const height = img.getAttribute("height");

        // Create Image component
        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={width ? width : "500"}
            height={height ? height : "500"}
            style={{ objectFit: "contain" }}
            priority
          />
        );

        // Render the Image component to HTML string
        const imageHtmlString = renderToStaticMarkup(imageComponent);

        // Replace the <img> element with the Image HTML string in the HTML content
        img.outerHTML = imageHtmlString;
      });

      // Set the transformed HTML content
      setTransformedContent(doc.body.innerHTML);
    };

    // Call the function to extract image data and replace <img>
    extractImageData();
  }, [content]);

  // Get Tag in Single
  const { data, loading } = useQuery(GetSingleTags, {
    variables: {
      // Single id
      id: databaseId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  // All tags in single
  const singleTags = data?.post?.tags?.edges ?? [];

  return (
    <>
      <article className={cx("component")}>
        <div dangerouslySetInnerHTML={{ __html: transformedContent ?? "" }} />
      </article>
      {/* Tag under post content */}
      {single !== "backissue" && single !== "contest" && (
        <div className={cx("tag-wrapper")}>
          <div className={cx("tag-title")}>{"Tagged in: "}</div>
          <div className={cx("tag-name-wrapper")}>
            {singleTags.map((post, index) => (
              <div className={cx("tag-name")} key={post?.node?.name}>
                {/* Add a key for efficient rendering */}
                {post?.node?.name && post?.node?.uri && (
                  <Link href={post?.node?.uri}>
                    <h2>
                      {index < singleTags.length - 1 ? (
                        <>
                          {post?.node?.name}
                          {","}{" "}
                        </>
                      ) : (
                        post?.node?.name
                      )}
                    </h2>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <ResponsiveComponent
        ComponentMobile={Interscroller}
        ComponentDesktop={"null"}
      />
    </>
  );
}

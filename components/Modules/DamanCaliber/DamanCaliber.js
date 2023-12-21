import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./DamanCaliber.module.scss";
import { GetDamanCaliber } from "../../../queries/GetDamanCaliber";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function DamanCaliber({}) {
  const postsPerPage = 5;

  // Get DAMAN Caliber Posts
  const { data } = useQuery(GetDamanCaliber, {
    variables: {
      // DAMAN Caliber category id
      id: 9821,
      first: postsPerPage,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const damanCaliberPosts = data?.category?.contentNodes?.edges ?? [];

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
    <>
      <div className={cx("component")}>
        <div className={cx("title-wrapper")}>
          {data?.category?.uri && data?.category?.name && (
            <Link href={data?.category?.uri}>
              <div className={cx("title")}>{data?.category?.name}</div>
            </Link>
          )}
        </div>
        {/* Mobile Version */}
        <div className={cx("mobile-wrapper")}>
          <Swiper
            slidesPerView={2.5}
            spaceBetween={16}
            className="carousel-swiper"
          >
            {damanCaliberPosts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className={cx("slide-wrapper")}>
                  {post?.node?.featuredImage && (
                    <div className={cx("slide-image-wrapper")}>
                      <Link href={post?.node?.uri}>
                        <Image
                          src={post?.node?.featuredImage?.node?.sourceUrl}
                          className={cx("featured-image")}
                          fill
                          sizes="100%"
                        />
                      </Link>
                    </div>
                  )}
                  {post?.node?.categories?.edges[0] && (
                    <div className={cx("slide-category-wrapper")}>
                      <Link href={post?.node?.categories?.edges[0]?.node?.uri}>
                        {
                          post?.node?.categories?.edges[0]?.node?.parent?.node
                            ?.name
                        }
                        {" | "}
                        {post?.node?.categories?.edges[0]?.node?.name}
                      </Link>
                    </div>
                  )}
                  {post?.node?.title && (
                    <div className={cx("slide-title-wrapper")}>
                      <Link href={post?.node?.uri}>
                        <h2>{post?.node?.title}</h2>
                      </Link>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop Version */}
        <div className={cx("desktop-wrapper")}>
          {damanCaliberPosts.map((post) => (
            <div className={cx("post-wrapper")}>
              {post?.node?.featuredImage && (
                <div className={cx("post-image-wrapper")}>
                  <Link href={post?.node?.uri}>
                    <Image
                      src={post?.node?.featuredImage?.node?.sourceUrl}
                      className={cx("featured-image")}
                      fill
                      sizes="100%"
                    />
                  </Link>
                </div>
              )}
              {post?.node?.categories?.edges[0] && (
                <div className={cx("post-category-wrapper")}>
                  <Link href={post?.node?.categories?.edges[0]?.node?.uri}>
                    <h2>
                      {post?.node?.categories?.edges[0]?.node?.parent &&
                        post?.node?.categories?.edges[0]?.node?.parent?.node
                          ?.name + " | "}
                      {post?.node?.categories?.edges[0]?.node?.name}
                    </h2>
                  </Link>
                </div>
              )}
              {post?.node?.title && (
                <div className={cx("post-title-wrapper")}>
                  <Link href={post?.node?.uri}>
                    <h2>{post?.node?.title}</h2>
                  </Link>
                </div>
              )}
              {post?.node?.excerpt && (
                <div className={cx("post-excerpt-wrapper")}>
                  <Link href={post?.node?.uri}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: calculateTrimmedExcerpt(post?.node?.excerpt),
                      }}
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={cx("view-more-wrapper")}>
          {data?.category?.uri && data?.category?.name && (
            <Link href={data?.category?.uri}>
              <div className={cx("view-more")}>{"View More"}</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

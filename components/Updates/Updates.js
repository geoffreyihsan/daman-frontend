import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Updates.module.scss";
import { GetUpdates } from "../../queries/GetUpdates";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function Updates({}) {
  const postsPerPage = 6;

  // Get menus
  const { data } = useQuery(GetUpdates, {
    variables: {
      first: postsPerPage,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const updatePosts = data?.category?.contentNodes?.edges ?? [];

  return (
    <>
      <div className={cx("component")}>
        <div className={cx("title-wrapper")}>
          <div className={cx("title")}>{"Updates"}</div>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={12}
          breakpoints={{
            640: {
              slidesPerView: 3.5,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          }}
          className="carousel-swiper"
        >
          {updatePosts.map((post, index) => (
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
                      <h2>{post?.node?.categories?.edges[0]?.node?.name}</h2>
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
    </>
  );
}

import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./UpdatesMobile.module.scss";
import { GetUpdates } from "../../queries/GetUpdates";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function UpdatesMobile() {
  const postsPerPage = 5;

  // Get Update Posts
  const { data } = useQuery(GetUpdates, {
    variables: {
      // Feature category id
      id: 12921,
      first: postsPerPage,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const updatePosts = data?.category?.contentNodes?.edges ?? [];

  return (
    <>
      <div className={cx("component")}>
        {data?.category?.name && (
          <div className={cx("title-wrapper")}>
            <div className={cx("title")}>{data?.category?.name}</div>
          </div>
        )}
        <div className={cx("mobile-wrapper")}>
          <Swiper
            slidesPerView={2.5}
            spaceBetween={16}
            className="carousel-swiper"
          >
            {updatePosts.map((post, index) => (
              <SwiperSlide key={index}>
                <div className={cx("slide-wrapper")}>
                  {post?.node?.featuredImage && (
                    <Link href={post?.node?.uri}>
                      <div className={cx("slide-image-wrapper")}>
                        <Image
                          src={post?.node?.featuredImage?.node?.sourceUrl}
                          alt={
                            post?.node?.featuredImage?.node?.altText
                              ? post?.node?.featuredImage?.node?.altText
                              : "Updates Image"
                          }
                          className={cx("featured-image")}
                          fill
                          sizes="100%"
                          priority
                        />
                      </div>
                    </Link>
                  )}
                  {post?.node?.categories?.edges[0] && (
                    <div className={cx("slide-category-wrapper")}>
                      <Link href={post?.node?.categories?.edges[0]?.node?.uri}>
                        {post?.node?.categories?.edges[0]?.node?.parent &&
                          post?.node?.categories?.edges[0]?.node?.parent?.node
                            ?.name + " | "}
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
      </div>
    </>
  );
}

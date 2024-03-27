import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./DamanPulseMobile.module.scss";
import { GetDamanPulse } from "../../queries/GetDamanPulse";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function DamanPulseMobile() {
  const offsetPosts = 1;
  const postsPerPage = 6;

  // Get DAMAN Pulse Offset
  const { data: firstData } = useQuery(GetDamanPulse, {
    variables: {
      // DAMAN Pulse category id
      id: 19392,
      // // Caliber category id for testing
      // id: 9821,
      after: null,
      first: offsetPosts,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const startCursor = firstData?.category?.contentNodes?.pageInfo?.startCursor;

  // Get DAMAN Pulse Posts
  const { data } = useQuery(GetDamanPulse, {
    variables: {
      // DAMAN Pulse category id
      id: 19392,
      // // Caliber category id for testing
      // id: 9821,
      after: startCursor,
      first: postsPerPage,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const damanPulsePosts = data?.category?.contentNodes?.edges ?? [];

  return (
    <>
      <div className={cx("component")}>
        <div className={cx("mobile-wrapper")}>
          <Swiper
            slidesPerView={2.5}
            spaceBetween={16}
            className="pulse-carousel-swiper"
          >
            {damanPulsePosts.map((post, index) => (
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
                      <Link
                        href={
                          post?.node?.categories?.edges[0]?.node?.parent?.node
                            ?.uri
                        }
                      >
                        {post?.node?.categories?.edges[0]?.node?.parent &&
                          post?.node?.categories?.edges[0]?.node?.parent?.node
                            ?.name}
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

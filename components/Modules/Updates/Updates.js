import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Updates.module.scss";
import { GetUpdates } from "../../../queries/GetUpdates";
import { GetCategory } from "../../../queries/GetCategory";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function Updates() {
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
  const firstUpdatePosts = data?.category?.contentNodes?.edges[0];
  const otherUpdatePosts = (data?.category?.contentNodes?.edges ?? []).slice(1);

  const calculateTrimmedExcerpt = (excerpt) => {
    const MAX_EXCERPT_LENGTH = 150; // You can adjust this value according to your needs

    let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH);
    const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex);
    }

    return `${trimmedExcerpt}`;
  };

  return (
    <>
      <div className={cx("component")}>
        {data?.category?.name && (
          <div className={cx("title-wrapper")}>
            <div className={cx("title")}>{data?.category?.name}</div>
          </div>
        )}
        {/* Mobile Version */}
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
        {/* Desktop Version */}
        <div className={cx("desktop-wrapper")}>
          <div className={cx("post-wrapper")}>
            {firstUpdatePosts?.node?.featuredImage && (
              <div className={cx("post-image-wrapper")}>
                <Link href={firstUpdatePosts?.node?.uri}>
                  <div className={cx("image-wrapper")}>
                    <Image
                      src={
                        firstUpdatePosts?.node?.featuredImage?.node?.sourceUrl
                      }
                      alt={
                        firstUpdatePosts?.node?.featuredImage?.node?.altText
                          ? firstUpdatePosts?.node?.featuredImage?.node?.altText
                          : "DAMAN Caliber Image"
                      }
                      className={cx("featured-image")}
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
              </div>
            )}
            {firstUpdatePosts?.node?.categories?.edges[0] && (
              <div className={cx("post-category-wrapper")}>
                <Link
                  href={firstUpdatePosts?.node?.categories?.edges[0]?.node?.uri}
                >
                  <h2>
                    {firstUpdatePosts?.node?.categories?.edges[0]?.node
                      ?.parent &&
                      firstUpdatePosts?.node?.categories?.edges[0]?.node?.parent
                        ?.node?.name + " | "}
                    {firstUpdatePosts?.node?.categories?.edges[0]?.node?.name}
                  </h2>
                </Link>
              </div>
            )}
            {firstUpdatePosts?.node?.title && (
              <div className={cx("post-title-wrapper")}>
                <Link href={firstUpdatePosts?.node?.uri}>
                  <h2>{firstUpdatePosts?.node?.title}</h2>
                </Link>
              </div>
            )}
            {firstUpdatePosts?.node?.excerpt && (
              <div className={cx("post-excerpt-wrapper")}>
                <Link href={firstUpdatePosts?.node?.uri}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: calculateTrimmedExcerpt(
                        firstUpdatePosts?.node?.excerpt
                      ),
                    }}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className={cx("two-columns-wrapper")}>
            {otherUpdatePosts.map((post) => (
              <div className={cx("other-post-wrapper")}>
                {post?.node?.featuredImage && (
                  <Link href={post?.node?.uri}>
                    <div className={cx("post-image-wrapper")}>
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
                  <div className={cx("other-post-category-wrapper")}>
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
                  <div className={cx("other-post-title-wrapper")}>
                    <Link href={post?.node?.uri}>
                      <h2>{post?.node?.title}</h2>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./OurRecommendations.module.scss";
import { GetOurRecommendations } from "../../queries/GetOurRecommendations";
import { GetOtherRecommendations } from "../../queries/GetOtherRecommendations";
import { BorderDivider } from "../../components";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

let cx = classNames.bind(styles);

// Randomized Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function OurRecommendations({ databaseId }) {
  // Initialize a state variable to hold shuffled more reviews
  const [shuffledOurRecommendations, setShuffledOurRecommendations] = useState(
    []
  );
  const [shuffledOtherRecommendations, setShuffledOtherRecommendations] =
    useState([]);

  // Get Stories
  const { data, error, loading } = useQuery(GetOurRecommendations, {
    variables: {
      id: databaseId,
      notIn: databaseId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Get Stories
  const {
    data: otherData,
    error: errorOther,
    loading: loadingOther,
  } = useQuery(GetOtherRecommendations, {
    variables: {
      id: databaseId,
      notIn: databaseId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const ourRecommendations =
    data?.post?.categories?.edges[0]?.node?.parent?.node?.posts?.edges ?? [];

  const otherRecommendations =
    otherData?.post?.categories?.edges[0]?.node?.posts?.edges ?? [];

  // Use an effect to shuffle more reviews when data changes
  useEffect(() => {
    if (ourRecommendations && ourRecommendations.length > 0) {
      // Clone the moreReviews array to avoid modifying the original data
      const clonedOurRecommendations = [...ourRecommendations];
      // Shuffle the cloned array
      const shuffledArray = shuffleArray(clonedOurRecommendations);
      // Set the shuffled array in state
      setShuffledOurRecommendations(shuffledArray);
    }
  }, [ourRecommendations]); // Trigger shuffling when moreReviews changes

  useEffect(() => {
    if (otherRecommendations && otherRecommendations.length > 0) {
      // Clone the moreReviews array to avoid modifying the original data
      const clonedOtherRecommendations = [...otherRecommendations];
      // Shuffle the cloned array
      const shuffledArray = shuffleArray(clonedOtherRecommendations);
      // Set the shuffled array in state
      setShuffledOtherRecommendations(shuffledArray);
    }
  }, [otherRecommendations]); // Trigger shuffling when moreReviews changes

  if (error || errorOther) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  if (loading || loadingOther) {
    return null;
  }

  // Show only the first 10 items from shuffledOurRecommendations || shuffledOtherRecommendations
  const ourRecommendationsLists =
    data?.post?.categories?.edges[0]?.node?.parent !== null
      ? shuffledOurRecommendations.slice(0, 10)
      : shuffledOtherRecommendations.slice(0, 10);

  return (
    <div className={cx("component")}>
      <BorderDivider />
      <div className={cx("title-wrapper")}>
        <div className={cx("title")}>{"Our Recommendations"}</div>
      </div>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          }}
          className="carousel-swiper"
        >
          {ourRecommendationsLists.map((post, index) => (
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
                            : "Our Recommendations Image"
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
  );
}

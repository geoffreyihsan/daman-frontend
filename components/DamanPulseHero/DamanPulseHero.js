import React from "react";
import className from "classnames/bind";
import styles from "./DamanPulseHero.module.scss";
import { useQuery } from "@apollo/client";
import { GetDamanPulse } from "../../queries/GetDamanPulse";
import { GetDamanPulseHero } from "../../queries/GetDamanPulseHero";
import { FormatDate } from "../../components";
import Image from "next/image";
import Link from "next/link";
import { LogoOfDamanPulse } from "../../public/logos/logos";
import { domine } from "../../styles/fonts/fonts";

let cx = className.bind(styles);

export default function DamanPulseHero({ databaseId }) {
  const postsPerPage = 6;

  // Get DAMAN Pulse First Content
  // const { data: firstData, loading } = useQuery(GetDamanPulseHero, {
  //   variables: {
  //     // Homepage id
  //     id: databaseId,
  //   },
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-and-network",
  // });

  // Get DAMAN Pulse Posts
  const { data, loading } = useQuery(GetDamanPulse, {
    variables: {
      // DAMAN Pulse category id
      id: 19392,
      first: postsPerPage,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Loading Menu
  if (loading) {
    return (
      <>
        <div className={cx("loading-wrapper")}>
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

  const firstContent = [
    {
      featuredImage:
        data?.category?.contentNodes?.edges[0]?.node?.featuredCover
          ?.featuredCover,
      uri: data?.category?.contentNodes?.edges[0]?.node?.uri,
      title: data?.category?.contentNodes?.edges[0]?.node?.title,
      excerpt: data?.category?.contentNodes?.edges[0]?.node?.excerpt,
      date: data?.category?.contentNodes?.edges[0]?.node?.date,
      categories: data?.category?.contentNodes?.edges[0]?.node?.categories,
    },
  ];

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
        <div className={cx("category-title-wrapper")}>
          {data?.category?.uri && data?.category?.name && (
            <Link href={data?.category?.uri}>
              <div className={cx("category-wrapper")}>
                <div className={cx("brand")}>
                  <LogoOfDamanPulse />
                </div>
              </div>
            </Link>
          )}
          <div className={cx("border-divider")}></div>
        </div>
        <div className={cx("swiper-wrapper")}>
          {firstContent?.map((content) => (
            <div className={cx("slide-wrapper")}>
              <div className={cx("swiper-image-wrapper")}>
                <div className={cx("image-wrapper")}>
                  <Link href={content?.uri}>
                    <Image
                      src={content?.featuredImage?.sourceUrl}
                      alt={
                        content?.featuredImage?.altText
                          ? content?.featuredImage?.altText
                          : "DAMAN Pulse Image"
                      }
                      fill
                      sizes="100%"
                      priority
                    />
                  </Link>
                </div>
              </div>
              <div className={cx("text-wrapper")}>
                <div className={cx("features-wrapper")}>
                  {content.categories?.edges[0]?.node?.parent && (
                    <div className={cx("post-category-wrapper")}>
                      <Link
                        href={
                          content.categories?.edges[0]?.node?.parent?.node?.uri
                        }
                      >
                        <h2>
                          {content.categories?.edges[0]?.node?.parent &&
                            content.categories?.edges[0]?.node?.parent?.node
                              ?.name}
                        </h2>
                      </Link>
                    </div>
                  )}
                </div>
                <div className={cx("title-wrapper")}>
                  <Link href={content?.uri}>{content?.title}</Link>
                </div>
                <div className={cx("excerpt-wrapper")}>
                  <Link href={content?.uri}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: calculateTrimmedExcerpt(content?.excerpt),
                      }}
                    />
                  </Link>
                </div>
                <div className={cx("meta-wrapper")}>
                  {content?.date && (
                    <time dateTime={content?.date}>
                      <FormatDate date={content?.date} />
                    </time>
                  )}
                </div>
                <div className={cx("view-more-wrapper")}>
                  <Link href={content?.uri}>{"View More"}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./DamanPulse.module.scss";
import { GetDamanPulse } from "../../queries/GetDamanPulse";
import { useQuery } from "@apollo/client";

let cx = classNames.bind(styles);

import Image from "next/image";

export default function DamanPulse() {
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
        <div className={cx("desktop-wrapper")}>
          {damanPulsePosts.map((post) => (
            <div className={cx("post-wrapper")}>
              {post?.node?.featuredImage && (
                <div className={cx("post-image-wrapper")}>
                  <Link href={post?.node?.uri}>
                    <div className={cx("image-wrapper")}>
                      <Image
                        src={post?.node?.featuredImage?.node?.sourceUrl}
                        alt={
                          post?.node?.featuredImage?.node?.altText
                            ? post?.node?.featuredImage?.node?.altText
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
              <div className={cx("post-text-wrapper")}>
                {post?.node?.categories?.edges[0] && (
                  <div className={cx("post-category-wrapper")}>
                    <Link
                      href={
                        post?.node?.categories?.edges[0]?.node?.parent?.node
                          ?.uri
                      }
                    >
                      <h2>
                        {post?.node?.categories?.edges[0]?.node?.parent &&
                          post?.node?.categories?.edges[0]?.node?.parent?.node
                            ?.name}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

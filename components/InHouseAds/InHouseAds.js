import Link from "next/link";
import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import styles from "./InHouseAds.module.scss";
import { GetSidebarComponent } from "../../queries/GetSidebarComponent";
import { useQuery } from "@apollo/client";

let cx = classNames.bind(styles);

export default function InHouseAds() {
  // Get Sidebar Component
  const { data, loading } = useQuery(GetSidebarComponent, {
    variables: {
      // Sidebar page id
      id: 99118,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  // Get Header Component
  const sidebarComponent = data?.page?.sidebarComponent ?? [];
  // Get inHouseAds
  const inHouseAds = sidebarComponent?.inHouseAds ?? [];
  // Subscribe link
  const subsLink = "/subscribe-daman";

  return (
    <>
      <div className={cx("component")}>
        {inHouseAds && (
          <div className={cx("image-wrapper")}>
            <Link href={subsLink}>
              <Image
                src={inHouseAds?.sourceUrl}
                alt={
                  inHouseAds?.altText
                    ? inHouseAds?.altText
                    : "In House Ads"
                }
                fill
                sizes="100%"
              />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

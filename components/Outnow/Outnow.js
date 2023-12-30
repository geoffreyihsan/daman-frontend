import Link from "next/link";
import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Outnow.module.scss";
import { GetSidebarComponent } from "../../queries/GetSidebarComponent";
import { useQuery } from "@apollo/client";

let cx = classNames.bind(styles);

export default function Outnow() {
  // Get Sidebar Component
  const { data, loading } = useQuery(GetSidebarComponent, {
    variables: {
      // Sidebar category id
      id: 19149,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  // Get Header Component
  const sidebarComponent = data?.category?.sidebarComponent ?? [];
  // Get Outnow
  const outnow = sidebarComponent?.outnow ?? [];
  // Subscribe link
  const subsLink = "/subscribe-daman";

  return (
    <>
      <div className={cx("component")}>
        {outnow && (
          <div className={cx("image-wrapper")}>
            <Link href={subsLink}>
              <Image
                src={outnow?.sourceUrl}
                altText={outnow?.altText}
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

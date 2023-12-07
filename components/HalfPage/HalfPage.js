import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HalfPage.module.scss";
import { useQuery } from "@apollo/client";
// import { GetHalfPage } from "../../queries/GetHalfPage";
import Image from "next/image";
import { Post, Button } from "..";

let cx = classNames.bind(styles);

export default function HalfPage() {

  // // Get HalfPage Banner
  // const { data, error, loading, fetchMore } = useQuery(GetHalfPage, {
  //   variables: {
  //     first: postsPerPage,
  //     after: null,
  //   },
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-and-network",
  // });

  return (
    <div className={cx("component")}>
      <div className={cx("half-page-wrapper")}>
        <Image
          src={
            "https://daman.co.id/daman.co.id/wp-content/uploads/2023/12/ZINIO-DAMAN-CALIBER-2021-copy-1.png"
          }
          className={cx("banner")}
          alt="dummy-banner"
          fill
          sizes="100%"
        />
      </div>
    </div>
  );
}

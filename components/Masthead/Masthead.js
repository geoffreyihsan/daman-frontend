import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Masthead.module.scss";
import { useQuery } from "@apollo/client";
// import { GetMasthead } from "../../queries/GetMasthead";
import Image from "next/image";
import { Post, Button } from "..";

let cx = classNames.bind(styles);

export default function Masthead() {

  // // Get Masthead Banner
  // const { data, error, loading, fetchMore } = useQuery(GetMasthead, {
  //   variables: {
  //     first: postsPerPage,
  //     after: null,
  //   },
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-and-network",
  // });

  return (
    <div className={cx("component")}>
      <div className={cx("masthead-wrapper")}>
        <Image
          src={
            "https://daman.co.id/daman.co.id/wp-content/uploads/2023/12/dior-sauvage-parfum-review-a-sensory-fragrance-journey-928746-1.png"
          }
          className={cx("desktop-banner")}
          alt="dummy-banner"
          fill
          sizes="100%"
        />
      </div>
    </div>
  );
}

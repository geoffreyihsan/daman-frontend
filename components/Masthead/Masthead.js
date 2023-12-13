import classNames from "classnames/bind";
import styles from "./Masthead.module.scss";
import { useEffect } from "react";

let cx = classNames.bind(styles);

export default function Masthead() {
  useEffect(() => {
    // Define ad slots using the Google Publisher Tag
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      googletag
        .defineSlot(
          "/6808792/DAMAN_MASTHEAD_TOP",
          [970, 250],
          "div-gpt-ad-1701941037105-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_MASTHEAD_TOP_MOBILE",
          [300, 250],
          "div-gpt-ad-1701941240723-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_MASTHEAD_BOTTOM",
          [970, 250],
          "div-gpt-ad-1701941453692-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_MASTHEAD_BOTTOM_MOBILE",
          [300, 250],
          "div-gpt-ad-1701941651336-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_Halfpage_01",
          [300, 600],
          "div-gpt-ad-1701941862020-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_Halfpage_02",
          [300, 600],
          "div-gpt-ad-1701941963018-0"
        )
        .addService(googletag.pubads());
      googletag
        .defineSlot(
          "/6808792/DAMAN_INTERSCROLLER",
          [300, 600],
          "div-gpt-ad-1702016546215-0"
        )
        .addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  }, []);

  return (
    <>
      <div className={cx("mobile-component")}>
        <div className={cx("masthead-wrapper")}>
          <div className={cx("mobile-banner")}>
            <div
              id="div-gpt-ad-1701941240723-0"
              style={{ minWidth: "300px", minHeight: "250px" }}
            ></div>
          </div>
        </div>
      </div>
      <div className={cx("desktop-component")}>
        <div className={cx("masthead-wrapper")}>
          <div className={cx("desktop-banner")}>
            <div
              id="div-gpt-ad-1701941037105-0"
              style={{ minWidth: "970px", minHeight: "250px" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

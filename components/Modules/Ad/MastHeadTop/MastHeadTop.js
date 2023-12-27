import classNames from "classnames/bind";
import styles from "./MastHeadTop.module.scss";
import { Ad } from "react-ad-manager";

let cx = classNames.bind(styles);

export default function MastHeadTop() {
  return (
    <>
      <div className={cx("mobile-banner")}>
        {/* MastHead Top Mobile */}
        <div className={cx("masthead-banner")}>
          <Ad
            adUnit="/6808792/DAMAN_MASTHEAD_TOP_MOBILE"
            name="div-gpt-ad-1701941240723-0"
            size={[300, 250]}
          />
        </div>
      </div>
      <div className={cx("desktop-banner")}>
        {/* MastHead Top Desktop */}
        <div className={cx("masthead-banner")}>
          <Ad
            adUnit="/6808792/DAMAN_MASTHEAD_TOP"
            name="div-gpt-ad-1701941037105-0"
            size={[970, 250]}
          />
        </div>
      </div>
    </>
  );
}

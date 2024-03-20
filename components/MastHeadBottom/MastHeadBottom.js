import classNames from "classnames/bind";
import styles from "./MastHeadBottom.module.scss";
import { Ad } from "react-ad-manager";

let cx = classNames.bind(styles);

export default function MastHeadBottom() {
  return (
    <div className={cx("desktop-banner")}>
      {/* Masthead Top Desktop */}
      <div className={cx("masthead-banner")}>
        <Ad
          adUnit="/6808792/DAMAN_MASTHEAD_BOTTOM"
          name="div-gpt-ad-1701941453692-0"
          size={[970, 250]}
        />
      </div>
    </div>
  );
}

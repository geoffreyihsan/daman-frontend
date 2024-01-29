import classNames from "classnames/bind";
import styles from "./MastHeadTopMobile.module.scss";
import { Ad } from "react-ad-manager";

let cx = classNames.bind(styles);

export default function MastHeadTopMobile() {
  return (
    <div className={cx("mobile-banner")}>
      {/* MastHead Top Mobile */}
      <div className={cx("masthead-banner")}>
        <Ad
          adUnit="/6808792/DAMAN_MASTHEAD_TOP_MOBILE"
          name="div-gpt-ad-1704170680492-0"
          size={[
            [300, 250],
            [320, 330],
          ]}
        />
      </div>
    </div>
  );
}

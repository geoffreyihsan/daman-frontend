import classNames from "classnames/bind";
import styles from "./Interscroller.module.scss";
import { Ad } from "react-ad-manager";

let cx = classNames.bind(styles);

export default function Interscroller() {
  return (
    <div className={cx("component")}>
      <div className={cx("interscroller-wrapper")}>
        <div className={cx("title-wrapper")}>
          <div className={cx("title")}>{"Interscroller Ads"}</div>
        </div>
        <div className={cx("interscroller-banner")}>
          {/* Interscroller Banner */}
          <Ad
            adUnit="/6808792/DAMAN_INTERSCROLLER"
            name="div-gpt-ad-1702016546215-0"
            size={[300, 600]}
          />
        </div>
        <div className={cx("scroll-down-wrapper")}>
          <div className={cx("scroll-down")}>{"Scroll down to continue"}</div>
        </div>
      </div>
    </div>
  );
}

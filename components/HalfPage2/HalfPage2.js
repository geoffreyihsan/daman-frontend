import classNames from "classnames/bind";
import styles from "./HalfPage2.module.scss";
import { Ad } from "react-ad-manager";

let cx = classNames.bind(styles);

export default function HalfPage2() {
  return (
    <div className={cx("halfpage-wrapper")}>
      <div className={cx("halfpage-banner")}>
        {/* HalfPage Banner */}
        <Ad
          adUnit="/6808792/DAMAN_HALFPAGE_02"
          name="div-gpt-ad-1701941963018-0"
          size={[300, 600]}
        />
      </div>
    </div>
  );
}

import classNames from "classnames/bind";
import styles from "./Halfpage.module.scss";

let cx = classNames.bind(styles);

export default function Halfpage(halfPage1, halfPage2) {
  return (
    <div className={cx("component")}>
      {halfPage1 && (
        <div className={cx("half-page-wrapper")}>
          <div className={cx("banner")}>
            <div dangerouslySetInnerHTML={{ __html: halfPage1?.halfPage1 }} />
          </div>
        </div>
      )}
      {halfPage2 && (
        <div className={cx("half-page-wrapper")}>
          <div className={cx("banner")}>
            <div dangerouslySetInnerHTML={{ __html: halfPage2?.halfPage2 }} />
          </div>
        </div>
      )}
    </div>
  );
}

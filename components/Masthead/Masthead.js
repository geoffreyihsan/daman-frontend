import classNames from "classnames/bind";
import styles from "./Masthead.module.scss";

let cx = classNames.bind(styles);

export default function Masthead(
  topMobile,
  topDesktop,
  bottomMobile,
  bottomDesktop
) {
  return (
    <div className={cx("component")}>
      {topMobile && (
        <div className={cx("masthead-wrapper")}>
          <div dangerouslySetInnerHTML={{ __html: topMobile?.topMobile }} />
        </div>
      )}
      {/* {topDesktop && (
        <div className={cx("masthead-wrapper")}>{topDesktop?.content}</div>
      )}
      {bottomMobile && (
        <div className={cx("masthead-wrapper")}>{bottomMobile?.content}</div>
      )}
      {bottomDesktop && (
        <div className={cx("masthead-wrapper")}>{bottomDesktop?.content}</div>
      )} */}
    </div>
  );
}

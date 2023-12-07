import styles from "./BorderDivider.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function BorderDivider() {
  return (
    <div className={cx(["component"])}>
      <div className={cx(["border"])}></div>
    </div>
  );
}

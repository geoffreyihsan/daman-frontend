import styles from "./Left.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function Left({ children, className }) {
  return (
    <div className={cx(["component", className])}>
      {children}
    </div>
  );
}

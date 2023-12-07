import styles from "./Right.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function Right({ children, className }) {
  return (
    <div className={cx(["component", className])}>
      {children}
    </div>
  );
}

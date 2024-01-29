import styles from "./Right.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function Right({ children, className }) {
  return (
    <div className={cx(["component", className])}>
      <aside className="h-auto sticky top-14 sm:top-20">{children}</aside>
    </div>
  );
}

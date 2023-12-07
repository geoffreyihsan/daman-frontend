import styles from "./TwoColumns.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function TwoColumns({ children, className }) {
  return (
    <div className={cx(["component", className])}>
      {children}
    </div>
  );
}

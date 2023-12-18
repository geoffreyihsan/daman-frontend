import { BorderDivider } from "../../../../components";
import styles from "./TwoColumns.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function TwoColumns({ children, className, border }) {
  return (
    <>
      {border && <BorderDivider />}
      <div className={cx(["component", className])}>{children}</div>
    </>
  );
}

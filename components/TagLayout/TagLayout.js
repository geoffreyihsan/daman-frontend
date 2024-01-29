import {
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
  PostTag,
  EntryHeaderTag,
} from "../../components";
import styles from "./TagLayout.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function TagLayout(databaseId) {
  return (
    <>
      <EntryHeaderTag databaseId={databaseId?.databaseId} />
      <div className={cx("two-columns")} border={false}>
        <div className={cx("left-column")}>
          <PostTag databaseId={databaseId?.databaseId} />
        </div>
        <div className={cx("right-column")}>
          <HalfPage1 />
          <Outnow />
          <HalfPage2 />
        </div>
      </div>
      <Interscroller />
    </>
  );
}

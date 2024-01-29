import {
  EntryHeaderCategory,
  PostCategory,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
} from "../../components";
import styles from "./CategoryLayout.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function CategoryLayout(databaseId) {
  return (
    <>
      <EntryHeaderCategory databaseId={databaseId?.databaseId} />
      <div className={cx("two-columns")}>
        <div className={cx("left-column")}>
          <PostCategory databaseId={databaseId?.databaseId} />
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

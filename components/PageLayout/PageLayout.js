import {
  EntryHeader,
  BorderDivider,
  ContentWrapperPage,
  HalfPage1,
  HalfPage2,
  Outnow,
} from "../../components";
import styles from "./PageLayout.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function PageLayout(title) {
  return (
    <>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <div className={cx("left-column")}>
          <EntryHeader title={title?.title} />
          <ContentWrapperPage content={title?.content} />
        </div>
        <div className={cx("right-column")}>
          <aside className="h-auto sticky top-14 sm:top-20">
            <HalfPage1 />
            <Outnow />
            <HalfPage2 />
          </aside>
        </div>
      </div>
    </>
  );
}

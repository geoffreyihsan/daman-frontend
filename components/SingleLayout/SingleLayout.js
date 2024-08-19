import {
  EntryHeader,
  ContentWrapper,
  BorderDivider,
  HalfPage1,
  Outnow,
  HalfPage2,
  OurRecommendations,
} from "../../components";
import styles from "./SingleLayout.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function SingleLayout(databaseId) {
  return (
    <>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <div className={cx("left-column")}>
          <EntryHeader
            title={databaseId?.title}
            date={databaseId?.date}
            categories={databaseId?.categories}
          />
          <ContentWrapper
            content={databaseId?.content}
            databaseId={databaseId?.databaseId}
            single={databaseId?.single}
            tags={databaseId?.tags}
          />
        </div>
        <div className={cx("right-column")}>
          <aside className="h-auto sticky top-14 sm:top-20">
            <HalfPage1 />
            <Outnow />
            <HalfPage2 />
          </aside>
        </div>
      </div>
      <OurRecommendations databaseId={databaseId?.databaseId} />
    </>
  );
}

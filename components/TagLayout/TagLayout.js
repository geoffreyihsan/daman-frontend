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
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

let cx = className.bind(styles);

const ResponsiveComponent = ({ ComponentMobile, ComponentDesktop }) => (
  <>
    <MediaQuery maxWidth={767}>
      <ComponentMobile />
    </MediaQuery>
    <MediaQuery minWidth={768}>
      <ComponentDesktop />
    </MediaQuery>
  </>
);

export default function TagLayout(databaseId) {
  return (
    <>
      <EntryHeaderTag databaseId={databaseId?.databaseId} />
      <div className={cx("two-columns")} border={false}>
        <div className={cx("left-column")}>
          <PostTag databaseId={databaseId?.databaseId} />
        </div>
        <div className={cx("right-column")}>
          <aside className="h-auto sticky top-14 sm:top-20">
            <HalfPage1 />
            <Outnow />
            <HalfPage2 />
          </aside>
        </div>
      </div>
      <ResponsiveComponent
        ComponentMobile={Interscroller}
        ComponentDesktop={"null"}
      />
    </>
  );
}

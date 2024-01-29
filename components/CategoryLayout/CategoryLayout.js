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
      <ResponsiveComponent
        ComponentMobile={Interscroller}
        ComponentDesktop={"null"}
      />
    </>
  );
}

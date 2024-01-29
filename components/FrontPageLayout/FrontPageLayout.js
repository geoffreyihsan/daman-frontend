import {
  HeroSlider,
  Updates,
  Features,
  DamanTv,
  DamanStyle,
  DamanCaliber,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
  SubscribeBox,
  InHouseAds,
  BorderDivider,
  UpdatesMobile,
  FeaturesMobile,
  DamanStyleMobile,
  DamanCaliberMobile,
} from "../../components";
import styles from "./FrontPageLayout.module.scss";
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

export default function FrontPageLayout(databaseId) {
  return (
    <div className={cx("component")}>
      <HeroSlider databaseId={databaseId?.databaseId} />
      <BorderDivider />
      <div className={cx("two-columns")}>
        <div className={cx("left-column")}>
          <ResponsiveComponent
            ComponentMobile={UpdatesMobile}
            ComponentDesktop={Updates}
          />
        </div>
        <div className={cx("right-column")}>
          <HalfPage1 />
          <Outnow />
        </div>
      </div>
      <Interscroller />
      <DamanTv damanTvLogo={databaseId?.damanTvLogo} />
      <BorderDivider />
      <div className={cx("two-columns")}>
        <div className={cx("left-column")}>
          <ResponsiveComponent
            ComponentMobile={FeaturesMobile}
            ComponentDesktop={Features}
          />
        </div>
        <div className={cx("right-column")}>
          <SubscribeBox />
          <HalfPage2 />
          <InHouseAds />
        </div>
      </div>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <ResponsiveComponent
          ComponentMobile={DamanStyleMobile}
          ComponentDesktop={DamanStyle}
        />
      </div>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <ResponsiveComponent
          ComponentMobile={DamanCaliberMobile}
          ComponentDesktop={DamanCaliber}
        />
      </div>
    </div>
  );
}
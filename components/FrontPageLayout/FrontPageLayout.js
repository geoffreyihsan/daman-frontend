import {
  HeroSlider,
  Updates,
  TwoColumns,
  Features,
  Left,
  Right,
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
} from "../../components";
import styles from "./FrontPageLayout.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function FrontPageLayout(databaseId) {
  return (
    <div className={cx("component")}>
      <HeroSlider databaseId={databaseId?.databaseId} />
      <BorderDivider />
      <div className={cx("two-columns")}>
        <Left>
          <Updates />
        </Left>
        <Right>
          <HalfPage1 />
          <Outnow />
        </Right>
      </div>
      <Interscroller />
      <DamanTv damanTvLogo={databaseId?.damanTvLogo} />
      <BorderDivider />
      <div className={cx("two-columns")}>
        <Left>
          <Features />
        </Left>
        <Right>
          <SubscribeBox />
          <HalfPage2 />
          <InHouseAds />
        </Right>
      </div>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <DamanStyle />
      </div>
      <BorderDivider />
      <div className={cx("two-columns")}>
        <DamanCaliber />
      </div>
    </div>
  );
}

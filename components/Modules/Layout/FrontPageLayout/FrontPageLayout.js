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
} from "../../../../components";

export default function FrontPageLayout(databaseId) {

  return (
    <>
      <HeroSlider databaseId={databaseId?.databaseId} />
      <TwoColumns border={true}>
        <Left>
          <Updates />
        </Left>
        <Right>
          <HalfPage1 />
          <Outnow />
        </Right>
      </TwoColumns>
      <Interscroller />
      <DamanTv damanTvLogo={databaseId?.damanTvLogo} />
      <TwoColumns border={true}>
        <Left>
          <Features />
        </Left>
        <Right>
          <SubscribeBox />
          <HalfPage2 />
          <InHouseAds />
        </Right>
      </TwoColumns>
      <TwoColumns border={true}>
        <DamanStyle />
      </TwoColumns>
      <TwoColumns border={true}>
        <DamanCaliber />
      </TwoColumns>
    </>
  );
}

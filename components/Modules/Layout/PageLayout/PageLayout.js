import {
  EntryHeader,
  BorderDivider,
  TwoColumns,
  Left,
  Right,
  ContentWrapperPage,
  HalfPage1,
  HalfPage2,
  Outnow,
} from "../../../../components";

export default function PageLayout(title) {
  return (
    <>
      <BorderDivider />
      <TwoColumns>
        <Left>
          <EntryHeader title={title?.title} />
          <ContentWrapperPage content={title?.content} />
        </Left>
        <Right>
          <HalfPage1 />
          <Outnow />
          <HalfPage2 />
        </Right>
      </TwoColumns>
    </>
  );
}

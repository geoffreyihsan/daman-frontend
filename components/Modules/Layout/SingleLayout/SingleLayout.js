import {
  EntryHeader,
  ContentWrapper,
  BorderDivider,
  TwoColumns,
  Left,
  Right,
  HalfPage1,
  Outnow,
  HalfPage2,
  OurRecommendations,
} from "../../../../components";

export default function SingleLayout(databaseId) {
  return (
    <>
      <BorderDivider />
      <TwoColumns>
        <Left>
          <EntryHeader
            title={databaseId?.title}
            date={databaseId?.date}
            categories={databaseId?.categories}
          />
          <ContentWrapper
            content={databaseId?.content}
            databaseId={databaseId?.databaseId}
            single={databaseId?.single}
          />
        </Left>
        <Right>
          <HalfPage1 />
          <Outnow />
          <HalfPage2 />
        </Right>
      </TwoColumns>
      <OurRecommendations databaseId={databaseId?.databaseId} />
    </>
  );
}

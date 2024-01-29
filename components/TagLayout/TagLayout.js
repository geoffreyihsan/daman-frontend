import {
  TwoColumns,
  Left,
  Right,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
  PostTag,
  EntryHeaderTag,
} from "../../components";

export default function TagLayout(databaseId) {
  return (
    <>
      <EntryHeaderTag databaseId={databaseId?.databaseId} />
      <TwoColumns border={false}>
        <Left>
          <PostTag databaseId={databaseId?.databaseId} />
        </Left>
        <Right>
          <HalfPage1 />
          <Outnow />
          <HalfPage2 />
        </Right>
      </TwoColumns>
      <Interscroller />
    </>
  );
}

import {
  EntryHeaderCategory,
  PostCategory,
  TwoColumns,
  Left,
  Right,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
} from "../../components";

export default function CategoryLayout(databaseId) {
  return (
    <>
      <EntryHeaderCategory databaseId={databaseId?.databaseId} />
      <TwoColumns border={false}>
        <Left>
          <PostCategory databaseId={databaseId?.databaseId} />
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

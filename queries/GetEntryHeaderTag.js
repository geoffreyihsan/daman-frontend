import { gql } from "@apollo/client";

export const GetEntryHeaderTag = gql`
  query GetEntryHeaderTag(
    $id: ID!
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149]
  ) {
    tag(id: $id, idType: DATABASE_ID) {
      name
      uri
    }
  }
`;

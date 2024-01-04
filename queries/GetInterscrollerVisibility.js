import { gql } from "@apollo/client";

export const GetInterscrollerVisibility = gql`
  query GetInterscrollerVisibility($id: ID!) {
    bannerAd(id: $id, idType: DATABASE_ID) {
      interscroller {
        visibility
      }
    }
  }
`;

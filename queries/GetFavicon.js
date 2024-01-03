import { gql } from "@apollo/client";

export const GetFavicon = gql`
  query GetFavicon {
    favicon {
      id
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
`;

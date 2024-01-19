import { gql } from "@apollo/client";

export const GetHeaderComponent = gql`
  query GetHeaderComponent($primaryLocation: MenuLocationEnum) {
    menus(where: { location: $primaryLocation }, first: 50) {
      nodes {
        headerComponent {
          buttonHeader {
            ... on Page {
              id
              title
              uri
            }
          }
          newCoverIssue {
            id
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

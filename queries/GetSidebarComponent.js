import { gql } from "@apollo/client";

export const GetSidebarComponent = gql`
  query GetSidebarComponent($id: ID!) {
    category(id: $id, idType: DATABASE_ID) {
      id
      sidebarComponent {
        outnow {
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
`;

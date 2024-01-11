import { gql } from "@apollo/client";

export const GetSingleTags = gql`
  query GetSingleTags($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      tags(first: 100, where: { orderby: NAME, order: ASC }) {
        edges {
          node {
            name
            uri
          }
        }
      }
    }
  }
`;

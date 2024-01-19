import { gql } from "@apollo/client";
import { FeaturedImage } from "../components";

export const GetDamanTv = gql`
  ${FeaturedImage.fragments.entry}
  query GetDamanTv(
    $id: ID!
    $first: Int!
  ) {
    category(id: $id, idType: DATABASE_ID) {
      name
      uri
      contentNodes(
        first: $first
        where: {
          contentTypes: POST
          status: PUBLISH
          orderby: { field: DATE, order: DESC }
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ... on Post {
              id
              title
              uri
              content
              ...FeaturedImageFragment
              categories(where: { childless: true }) {
                edges {
                  node {
                    name
                    uri
                    parent {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

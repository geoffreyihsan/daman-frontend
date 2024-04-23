import { gql } from "@apollo/client";

export const GetDamanPulse = gql`
  query GetDamanPulse(
    $id: ID!
    $first: Int!
    $after: String
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149, 19392]
  ) {
    category(id: $id, idType: DATABASE_ID) {
      name
      uri
      contentNodes(
        first: $first
        after: $after
        where: {
          contentTypes: POST
          status: PUBLISH
          orderby: { field: DATE, order: DESC }
        }
      ) {
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        edges {
          node {
            ... on Post {
              id
              title
              uri
              excerpt
              featuredCover {
                featuredCover {
                  sourceUrl
                  altText
                }
              }
              categories(where: { childless: true, exclude: $exclude }) {
                edges {
                  node {
                    name
                    uri
                    parent {
                      node {
                        name
                        uri
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

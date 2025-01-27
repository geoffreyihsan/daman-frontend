import { gql } from "@apollo/client";

export const GetUpdates = gql`
  query GetUpdates(
    $id: ID!
    $first: Int!
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149, 19392]
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
              excerpt
              featuredImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
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

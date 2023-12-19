import { gql } from "@apollo/client";

export const GetPostCategory = gql`
  query GetPostCategory(
    $first: Int
    $after: String
    $id: ID!
    $exclude: [ID] = [4, 12921, 9821, 9803]
  ) {
    category(id: $id, idType: DATABASE_ID) {
      name
      uri
      parent {
        node {
          name
        }
      }
      contentNodes(
        first: $first
        after: $after
        where: {
          status: PUBLISH
          contentTypes: POST
          orderby: [{ field: DATE, order: DESC }]
        }
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ... on Post {
              id
              title
              date
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
              author {
                node {
                  name
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

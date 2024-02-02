import { gql } from "@apollo/client";

export const GetSearchResults = gql`
  query GetSearchResults(
    $first: Int!
    $after: String
    $terms: [String]
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149]
  ) {
    contentNodes(
      first: $first
      after: $after
      where: {
        status: PUBLISH
        taxQuery: {
          relation: OR
          taxArray: {
            field: NAME
            operator: IN
            taxonomy: TAG
            terms: $terms
          }
        }
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
            databaseId
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
`;

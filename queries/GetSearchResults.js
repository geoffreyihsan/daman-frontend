import { gql } from "@apollo/client";

export const GetSearchResults = gql`
  query GetSearchResults(
    $first: Int!
    $after: String
    $search: String
  ) {
    tags(first: $first, after: $after, where: { search: $search }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          contentNodes(
            first: 1000
            where: { status: PUBLISH, contentTypes: [POST] }
          ) {
            edges {
              node {
                ... on Post {
                  databaseId
                  title
                  date
                  uri
                  excerpt
                  featuredImage {
                    node {
                      sourceUrl
                      altText
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

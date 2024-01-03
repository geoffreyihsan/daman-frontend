import { gql } from "@apollo/client";

export const GetSearchResults = gql`
  query GetSearchResults(
    $first: Int!
    $after: String
    $search: String
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149]
  ) {
    tags(first: $first, after: $after, where: { search: $search }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
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
        cursor
      }
    }
  }
`;

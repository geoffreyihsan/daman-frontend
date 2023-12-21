import { gql } from "@apollo/client";

export const GetOtherRecommendations = gql`
  query GetOtherRecommendations(
    $id: ID!
    $notIn: [ID!]
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744]
  ) {
    post(id: $id, idType: DATABASE_ID) {
      categories(first: 1, where: { childless: true }) {
        edges {
          node {
            posts(first: 50, where: { notIn: $notIn }) {
              edges {
                node {
                  title
                  uri
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
    }
  }
`;

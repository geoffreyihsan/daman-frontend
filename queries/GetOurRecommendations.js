import { gql } from "@apollo/client";

export const GetOurRecommendations = gql`
  query GetOurRecommendations(
    $id: ID!
    $notIn: [ID!]
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149, 19392]
  ) {
    post(id: $id, idType: DATABASE_ID) {
      categories(first: 1, where: { childless: true, exclude: $exclude }) {
        edges {
          node {
            parent {
              node {
                posts(first: 5, where: { notIn: $notIn }) {
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
                      categories(
                        where: { childless: true, exclude: $exclude }
                      ) {
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
    }
  }
`;

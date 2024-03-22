import { gql } from "@apollo/client";

export const GetEntryHeaderCategory = gql`
  query GetEntryHeaderCategory(
    $id: ID!
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149, 19392]
  ) {
    category(id: $id, idType: DATABASE_ID) {
      name
      uri
      parent {
        node {
          name
          uri
          children(where: { childless: true }) {
            edges {
              node {
                name
                uri
              }
            }
          }
          parent {
            node {
              name
            }
          }
        }
      }
      children {
        edges {
          node {
            name
            uri
            posts {
              edges {
                node {
                  id
                  title
                  content
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

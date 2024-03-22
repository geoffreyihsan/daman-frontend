import { gql } from "@apollo/client";

export const GetDamanPulseHero = gql`
  query GetDamanPulseHero(
    $id: ID!
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149, 19392]
  ) {
    page(id: $id, idType: DATABASE_ID) {
      daManPulse {
        post1 {
          ... on Post {
            title
            excerpt
            date
            uri
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
        image1 {
          sourceUrl
          altText
        }
      }
    }
  }
`;

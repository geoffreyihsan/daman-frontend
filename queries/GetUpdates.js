import { gql } from "@apollo/client";
import { FeaturedImage } from "../components";

export const GetUpdates = gql`
  ${FeaturedImage.fragments.entry}
  query GetUpdates($first: Int, $exclude: [ID] = [4, 12921, 9821, 9803]) {
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
            ...FeaturedImageFragment
            categories(where: { childless: true, exclude: $exclude }) {
              edges {
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
`;

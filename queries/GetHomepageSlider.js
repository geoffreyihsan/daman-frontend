import { gql } from "@apollo/client";
import { FeaturedImage } from "../components";

export const GetHomepageSlider = gql`
  ${FeaturedImage.fragments.entry}
  query GetHomepageSlider($first: Int, $after: String) {
    contentNodes(
      first: $first
      after: $after
      where: {
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
        contentTypes: POST
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Post {
            title
            content
            date
            ...FeaturedImageFragment
            id
            uri
          }
        }
      }
    }
  }
`;

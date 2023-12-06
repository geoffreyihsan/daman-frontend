import { gql } from "@apollo/client";
import { FeaturedImage } from "../components";

export const GetUpdates = gql`
  ${FeaturedImage.fragments.entry}
  query GetUpdates($first: Int) {
    category(id: "12921", idType: DATABASE_ID) {
      contentNodes(
        first: $first
        where: { contentTypes: POST, orderby: { field: DATE, order: DESC } }
      ) {
        edges {
          node {
            ... on Post {
              id
              title
              uri
              excerpt
              ...FeaturedImageFragment
              categories(where: { childless: true }) {
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
  }
`;

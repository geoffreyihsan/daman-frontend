import { gql } from "@apollo/client";

export const GetMasthead = gql`
  query GetMasthead($slug: String) {
    bannerAdBy(slug: $slug) {
      content
    }
  }
`;

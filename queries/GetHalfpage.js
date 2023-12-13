import { gql } from "@apollo/client";

export const GetHalfpage = gql`
  query GetHalfpage($slug: String) {
    bannerAdBy(slug: $slug) {
      content
    }
  }
`;

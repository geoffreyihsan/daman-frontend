import { gql } from "@apollo/client";

export const GetHeroSlider = gql`
  query GetHeroSlider($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      homepageSlider {
        postSlide1 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide2 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide3 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide4 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide5 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide6 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide7 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        postSlide8 {
          ... on Post {
            title
            excerpt
            date
            uri
          }
        }
        imageSlide1 {
          sourceUrl
          altText
        }
        imageSlide2 {
          sourceUrl
          altText
        }
        imageSlide3 {
          sourceUrl
          altText
        }
        imageSlide4 {
          sourceUrl
          altText
        }
        imageSlide5 {
          sourceUrl
          altText
        }
        imageSlide6 {
          sourceUrl
          altText
        }
        imageSlide7 {
          sourceUrl
          altText
        }
        imageSlide8 {
          sourceUrl
          altText
        }
      }
    }
  }
`;

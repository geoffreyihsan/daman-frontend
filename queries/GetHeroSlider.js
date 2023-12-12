import { gql } from "@apollo/client";

export const GetHeroSlider = gql`
  query GetHeroSlider($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      homepageSlider {
        postSlide1 {
          ... on Post {
            id
            title
            excerpt
            date
            uri
            author {
              node {
                name
              }
            }
          }
        }
        postSlide2 {
          ... on Post {
            id
            title
            excerpt
            date
            uri
            author {
              node {
                name
              }
            }
          }
        }
        postSlide3 {
          ... on Post {
            id
            title
            excerpt
            date
            uri
            author {
              node {
                name
              }
            }
          }
        }
        postSlide4 {
          ... on Post {
            id
            title
            excerpt
            date
            uri
            author {
              node {
                name
              }
            }
          }
        }
        postSlide5 {
          ... on Post {
            id
            title
            excerpt
            date
            uri
            author {
              node {
                name
              }
            }
          }
        }
        imageSlide1 {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        imageSlide2 {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        imageSlide3 {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        imageSlide4 {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        imageSlide5 {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

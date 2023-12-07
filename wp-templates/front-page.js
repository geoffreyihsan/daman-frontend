import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  Container,
  FeaturedImage,
  SEO,
  NavigationMenu,
  HomepageSlider,
  Updates,
  TwoColumns,
  Masthead,
  Features,
  BorderDivider,
  HalfPage,
  Left,
  Right,
} from "../components";

export default function frontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const { homepageSlider } = props?.data?.page ?? [];

  const homepageSlides = [
    {
      featuredImage: homepageSlider?.postSlide1?.featuredImage,
      url: homepageSlider?.postSlide1?.uri,
      excerpt: homepageSlider?.postSlide1?.excerpt,
    },
    {
      featuredImage: homepageSlider?.postSlide2?.featuredImage,
      url: homepageSlider?.postSlide2?.uri,
      excerpt: homepageSlider?.postSlide2?.excerpt,
    },
    {
      featuredImage: homepageSlider?.postSlide3?.featuredImage,
      url: homepageSlider?.postSlide3?.uri,
      excerpt: homepageSlider?.postSlide3?.excerpt,
    },
    {
      featuredImage: homepageSlider?.postSlide4?.featuredImage,
      url: homepageSlider?.postSlide4?.uri,
      excerpt: homepageSlider?.postSlide4?.excerpt,
    },
    {
      featuredImage: homepageSlider?.postSlide5?.featuredImage,
      url: homepageSlider?.postSlide5?.uri,
      excerpt: homepageSlider?.postSlide5?.excerpt,
    },
  ];

  // useEffect(() => {
  //   const filteredHomepageSlide = HomepageSlider.filter((item) => item.type !== null)

  //   if (filteredHomepageSlide.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * filteredHomepageSlide.length)
  //     setCurrentHomepageSlide(filteredHomepageSlide[randomIndex])
  //   }
  // }, [])

  // Get menus
  const { data: menusData, loading: menusLoading } = useQuery(GetMenus, {
    variables: {
      primaryLocation: MENUS.PRIMARY_LOCATION,
      secondaryLocation: MENUS.SECONDARY_LOCATION,
      thirdLocation: MENUS.THIRD_LOCATION,
      navigationLocation: MENUS.NAVIGATION_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const primaryMenu = menusData?.primaryMenuItems?.nodes ?? [];
  const secondaryMenu = menusData?.secondaryMenuItems?.nodes ?? [];
  const thirdMenu = menusData?.thirdMenuItems?.nodes ?? [];
  const navigationMenu = menusData?.navigationMenuItems?.nodes ?? [];
  const footerMenu = menusData?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        navigationMenuItems={navigationMenu}
        menusLoading={menusLoading}
      />
      <Main>
        <>
          <HomepageSlider homepageSlides={homepageSlides} />
          <BorderDivider />
          <Updates />
          <BorderDivider />
          <TwoColumns>
            <Left>
              <Features />
            </Left>
            <Right>
              <HalfPage />
            </Right>
          </TwoColumns>
        </>
      </Main>
      {/* <Footer
        title={siteTitle}
        menuItems={footerMenu}
        menusLoading={menusLoading}
      /> */}
    </>
  );
}

frontPage.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
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
            ...FeaturedImageFragment
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
            ...FeaturedImageFragment
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
            ...FeaturedImageFragment
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
            ...FeaturedImageFragment
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
            ...FeaturedImageFragment
          }
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`;

frontPage.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

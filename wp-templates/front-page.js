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
  HeroSlider,
  Updates,
  TwoColumns,
  Masthead,
  Features,
  BorderDivider,
  Halfpage,
  Left,
  Right,
  DamanTv,
} from "../components";
import { GetMasthead } from "../queries/GetMasthead";

export default function frontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const { databaseId, homepageComponent } = props?.data?.page ?? [];

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

  const halfPage1 = "half-page-1";
  const halfPage2 = "half-page-2";

  // Advertorial Var
  let queryVariables = {
    slug: halfPage1,
  };

  // if (mastheadTopMobile) {
  //   // Modify the variables based on the condition
  //   queryVariables = {
  //     slug: topMobile, // Change this to the desired value
  //   };
  // }

  // if (mastheadTopDesktop) {
  //   // Modify the variables based on the condition
  //   queryVariables = {
  //     slug: topDesktop, // Change this to the desired value
  //   };
  // }

  // Get Masthead Banner
  const { data } = useQuery(GetMasthead, {
    variables: queryVariables,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Use a regular expression to extract content between <!-- and <!--
  const match = data?.bannerAdBy?.content.match(/(<!--.*?)<!--/s);

  // Check if there's a match
  const extractedContent = match ? match[1] : null;

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
          <HeroSlider databaseId={databaseId} />
          <BorderDivider />
          <TwoColumns>
            <Left>
              <Updates />
            </Left>
            <Right>
              <Halfpage />
            </Right>
          </TwoColumns>
          <DamanTv damanTvLogo={homepageComponent?.damanTvLogo} />
          <BorderDivider />
          <TwoColumns>
            <Left>
              <Features />
            </Left>
            <Right>
              <Halfpage halfPage1={extractedContent}/>
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
      databaseId
      ...FeaturedImageFragment
      homepageComponent {
        damanTvLogo {
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

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
  Left,
  Right,
  DamanTv,
} from "../components";

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
            </Right>
          </TwoColumns>
          <DamanTv damanTvLogo={homepageComponent?.damanTvLogo} />
          <BorderDivider />
          <TwoColumns>
            <Left>
              <Features />
            </Left>
            <Right>
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

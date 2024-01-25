import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  FeaturedImage,
  SEO,
  HeroSlider,
  Updates,
  TwoColumns,
  Features,
  Left,
  Right,
  DamanTv,
  DamanStyle,
  DamanCaliber,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
  SubscribeBox,
  InHouseAds,
} from "../components";

export default function frontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { databaseId, homepageComponent, uri, seo, featuredImage } =
    props?.data?.page ?? [];

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
      navigationLocation: MENUS.NAVIGATION_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const primaryMenu = menusData?.primaryMenuItems?.nodes ?? [];
  const secondaryMenu = menusData?.secondaryMenuItems?.nodes ?? [];
  const navigationMenu = menusData?.navigationMenuItems?.nodes ?? [];
  const footerMenu = menusData?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W2MZPZT"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <Header
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        navigationMenuItems={navigationMenu}
        menusLoading={menusLoading}
      />
      <Main>
        <>
          <HeroSlider databaseId={databaseId} />
          <TwoColumns border={true}>
            <Left>
              <Updates />
            </Left>
            <Right>
              <HalfPage1 />
              <Outnow />
            </Right>
          </TwoColumns>
          <Interscroller />
          <DamanTv damanTvLogo={homepageComponent?.damanTvLogo} />
          <TwoColumns border={true}>
            <Left>
              <Features />
            </Left>
            <Right>
              <SubscribeBox />
              <HalfPage2 />
              <InHouseAds />
            </Right>
          </TwoColumns>
          <TwoColumns border={true}>
            <DamanStyle />
          </TwoColumns>
          <TwoColumns border={true}>
            <DamanCaliber />
          </TwoColumns>
        </>
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
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
      seo {
        title
        metaDesc
        focuskw
      }
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

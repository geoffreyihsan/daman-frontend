import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { inter } from "../styles/fonts/fonts";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  FeaturedImage,
  SEO,
  FrontPageLayout,
} from "../components";

export default function FrontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { databaseId, homepageComponent, uri, seo, featuredImage } =
    props?.data?.page ?? [];

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
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <Header
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        navigationMenuItems={navigationMenu}
        menusLoading={menusLoading}
      />
      <Main className={inter.className}>
        <FrontPageLayout
          databaseId={databaseId}
          damanTvLogo={homepageComponent?.damanTvLogo}
        />
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </>
  );
}

FrontPage.query = gql`
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

FrontPage.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

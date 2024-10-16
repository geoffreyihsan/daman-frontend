import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import { Header, Footer, SEO, SubscribePageLayout } from "../components";
import { inter } from "../styles/fonts/fonts";

export default function Page(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title, content, featuredImage, uri, seo } = props?.data?.page ?? {
    title: "",
  };

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
    <main className={inter.className}>
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
      <SubscribePageLayout title={title} content={content} />
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </main>
  );
}

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  query GetPageData($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      databaseId
      title
      content
      featuredImage {
        node {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      seo {
        title
        metaDesc
        focuskw
      }
      uri
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`;

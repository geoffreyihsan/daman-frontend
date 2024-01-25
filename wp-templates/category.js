import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  SEO,
  EntryHeaderCategory,
  PostCategory,
  TwoColumns,
  Left,
  Right,
  HalfPage1,
  HalfPage2,
  Outnow,
  Interscroller,
} from "../components";

export default function Category(props) {
  const { databaseId, seo, uri } = props?.data?.category;

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
          <EntryHeaderCategory databaseId={databaseId} />
          <TwoColumns border={false}>
            <Left>
              <PostCategory databaseId={databaseId} />
            </Left>
            <Right>
              <HalfPage1 />
              <Outnow />
              <HalfPage2 />
            </Right>
          </TwoColumns>
          <Interscroller />
        </>
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </>
  );
}

Category.query = gql`
  ${BlogInfoFragment}
  query GetCategoryPage($databaseId: ID!) {
    category(id: $databaseId, idType: DATABASE_ID) {
      databaseId
      uri
      seo {
        title
        metaDesc
        focuskw
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
  }
`;

Category.variables = ({ databaseId }) => {
  return {
    databaseId,
  };
};

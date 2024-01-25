import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  EntryHeader,
  ContentWrapper,
  FeaturedImage,
  SEO,
  BorderDivider,
  TwoColumns,
  Left,
  Right,
  HalfPage1,
  Outnow,
  HalfPage2,
} from "../components";

export default function SingleBackIssue(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title, content, featuredImage, date, databaseId, seo, uri } =
    props?.data?.backIssue;

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
          <BorderDivider />
          <TwoColumns>
            <Left>
              <EntryHeader title={title} date={date} />
              <ContentWrapper
                content={content}
                databaseId={databaseId}
                single={"backissue"}
              />
            </Left>
            <Right>
              <HalfPage1 />
              <Outnow />
              <HalfPage2 />
            </Right>
          </TwoColumns>
        </>
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </>
  );
}

SingleBackIssue.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetBackIssue($databaseId: ID!, $asPreview: Boolean = false) {
    backIssue(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      uri
      ...FeaturedImageFragment
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

SingleBackIssue.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

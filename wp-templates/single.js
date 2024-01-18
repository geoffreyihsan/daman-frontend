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
  TwoColumns,
  Left,
  Right,
  OurRecommendations,
  BorderDivider,
  HalfPage1,
  HalfPage2,
  Outnow,
} from "../components";

export default function Single(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const {
    title,
    content,
    featuredImage,
    date,
    categories,
    databaseId,
    seo,
    uri,
  } = props?.data?.post;

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
        thirdMenuItems={thirdMenu}
        navigationMenuItems={navigationMenu}
        menusLoading={menusLoading}
      />
      <Main>
        <>
          <BorderDivider />
          <TwoColumns>
            <Left>
              <EntryHeader
                title={title}
                date={date}
                categories={categories?.edges[0]}
              />
              <ContentWrapper content={content} databaseId={databaseId} />
            </Left>
            <Right>
              <HalfPage1 />
              <Outnow />
              <HalfPage2 />
            </Right>
          </TwoColumns>
          <OurRecommendations databaseId={databaseId} />
        </>
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </>
  );
}

Single.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $asPreview: Boolean = false
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744, 19149]
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      uri
      categories(where: { childless: true, exclude: $exclude }) {
        edges {
          node {
            name
            uri
            parent {
              node {
                name
              }
            }
          }
        }
      }
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

Single.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

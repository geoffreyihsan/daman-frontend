import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  Main,
  Container,
  EntryHeader,
  ContentWrapper,
  FeaturedImage,
  SEO,
  FeaturedImageSingle,
  TwoColumns,
  Left,
  Right,
  OurRecommendations,
  BorderDivider,
  HalfPage1,
  HalfPage2,
} from "../components";

export default function Single(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const {
    title,
    content,
    featuredImage,
    date,
    author,
    categories,
    databaseId,
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
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        primaryMenuItems={primaryMenu}
        secondaryMenuItems={secondaryMenu}
        thirdMenuItems={thirdMenu}
        navigationMenuItems={navigationMenu}
        menusLoading={menusLoading}
      />
      <Main>
        <>
          {/* <FeaturedImageSingle image={featuredImage?.node} /> */}
          <BorderDivider />
          <TwoColumns>
            <Left>
              <EntryHeader
                title={title}
                date={date}
                author={author?.node?.name}
                categories={categories?.edges[0]}
              />
              <ContentWrapper content={content} />
            </Left>
            <Right>
              <HalfPage1 />
              <HalfPage2 />
            </Right>
          </TwoColumns>
          <OurRecommendations databaseId={databaseId} />
        </>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        menusLoading={menusLoading}
      />
    </>
  );
}

Single.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetPost(
    $databaseId: ID!
    $asPreview: Boolean = false
    $exclude: [ID] = [4, 12921, 9821, 9803, 13125, 1, 8743, 8744]
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      author {
        node {
          name
        }
      }
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

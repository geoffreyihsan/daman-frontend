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
  SingleLayout,
} from "../components";

export default function SingleContest(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title, content, featuredImage, date, databaseId, seo, uri } =
    props?.data?.contest;

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
        <>
          <SingleLayout
            databaseId={databaseId}
            title={title}
            date={date}
            content={content}
            single={"contest"}
          />
        </>
      </Main>
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </>
  );
}

SingleContest.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetContest($databaseId: ID!, $asPreview: Boolean = false) {
    contest(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
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

SingleContest.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

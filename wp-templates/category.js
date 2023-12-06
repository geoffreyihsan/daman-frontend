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
  Post,
  FeaturedImage,
  SEO,
} from "../components";

export default function Category(props) {
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const { name, posts } = props?.data?.category;

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
          <EntryHeader title={`Category: ${name}`} />
          <>
            {posts.edges.map((post) => (
              <Post
                title={post?.node?.title}
                // content={post?.node?.content}
                // date={post?.node?.date}
                // author={post?.node?.author?.node?.name}
                uri={post?.node?.uri}
                featuredImage={post?.node?.featuredImage?.node}
              />
            ))}
          </>
        </>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
      />
    </>
  );
}

Category.query = gql`
  ${BlogInfoFragment}
  ${FeaturedImage.fragments.entry}
  query GetCategoryPage($databaseId: ID!) {
    category(id: $databaseId, idType: DATABASE_ID) {
      name
      posts {
        edges {
          node {
            id
            title
            content
            date
            uri
            ...FeaturedImageFragment
            author {
              node {
                name
              }
            }
          }
        }
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

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { gql, useQuery } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { GetMenus } from "../queries/GetMenus";
import {
  Header,
  Footer,
  SEO,
  SingleLayout,
  PasswordProtected,
} from "../components";
import { inter } from "../styles/fonts/fonts";

export default function SingleBackIssue(props) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored password in cookies on mount
  useEffect(() => {
    const storedPassword = Cookies.get("backIssuePassword");
    if (
      storedPassword &&
      storedPassword === props?.data?.backIssue?.passwordProtected?.password
    ) {
      setIsAuthenticated(true);
    }
  }, [props?.data?.backIssue?.passwordProtected?.password]);

  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const {
    title,
    content,
    featuredImage,
    date,
    databaseId,
    seo,
    uri,
    passwordProtected,
  } = props?.data?.backIssue;

  console.log(passwordProtected);

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

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === passwordProtected?.password) {
      setIsAuthenticated(true);
      Cookies.set("backIssuePassword", enteredPassword, { expires: 1 }); // Set cookie to expire in 1 day
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (passwordProtected?.onOff && !isAuthenticated) {
    return (
      <main className={inter.className}>
        <form onSubmit={handlePasswordSubmit}>
          <PasswordProtected
            enteredPassword={enteredPassword}
            setEnteredPassword={setEnteredPassword}
          />
        </form>
      </main>
    );
  }

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
      <SingleLayout
        databaseId={databaseId}
        title={title}
        date={date}
        content={content}
        single={"backissue"}
      />
      <Footer menuItems={footerMenu} menusLoading={menusLoading} />
    </main>
  );
}

SingleBackIssue.query = gql`
  ${BlogInfoFragment}
  query GetBackIssue($databaseId: ID!, $asPreview: Boolean = false) {
    backIssue(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      databaseId
      content
      date
      uri
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
      passwordProtected {
        onOff
        password
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

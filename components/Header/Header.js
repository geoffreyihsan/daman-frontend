import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import DaManLogo from "../../assets/logo/daman-logo.png";
import { FullMenu, MastHeadTop, MastHeadTopMobile, NavigationMenu } from "../../components";
import * as MENUS from "../../constants/menus";
import { GetHeaderComponent } from "../../queries/GetHeaderComponent";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

let cx = classNames.bind(styles);

const ResponsiveComponent = ({ ComponentMobile, ComponentDesktop }) => (
  <>
    <MediaQuery maxWidth={767}>
      <ComponentMobile />
    </MediaQuery>
    <MediaQuery minWidth={768}>
      <ComponentDesktop />
    </MediaQuery>
  </>
);

export default function Header({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  navigationMenuItems,
  menusLoading,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchShown, setIsSearchShown] = useState(false);

  // Clear search input
  const clearSearch = () => {
    setSearchQuery(""); // Reset the search query
  };

  // Get menus
  const { data: menusData } = useQuery(GetHeaderComponent, {
    variables: {
      primaryLocation: MENUS.PRIMARY_LOCATION,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Get Header Component
  const headerComponent = menusData?.menus?.nodes[0]?.headerComponent ?? [];
  // Subscribe link
  const subsLink = "/subscribe-daman";

  // Add sticky header on scroll
  useEffect(() => {
    function handleScroll() {
      // setIsScrolled after Masthead height
      setIsScrolled(window.scrollY > 282);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ResponsiveComponent
        ComponentMobile={MastHeadTopMobile}
        ComponentDesktop={MastHeadTop}
      />
      {/* Main Header */}
      <header className={cx("component", { sticky: isScrolled })}>
        <div className={cx("wrapper")}>
          {!isNavShown ? (
            <>
              <div className={cx("button-header")}>
                {headerComponent?.buttonHeader?.title &&
                  headerComponent?.buttonHeader?.uri && (
                    <Link href={headerComponent?.buttonHeader?.uri}>
                      {headerComponent?.buttonHeader?.title}
                    </Link>
                  )}
              </div>
              <div className={cx("navbar")}>
                <Link href="/" className={cx("logo")}>
                  <div className={cx("brand")}>
                    <Image
                      src={DaManLogo}
                      alt={"DaMan Logo"}
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
              </div>
              {/* Menu Button */}
              <div className={cx("menu-button")}>
                {/* menu button */}
                <button
                  type="button"
                  className={cx("menu-icon")}
                  onClick={() => {
                    setIsNavShown(!isNavShown);
                    setSearchQuery("");
                  }}
                  aria-label="Toggle navigation"
                  aria-controls={cx("full-menu-wrapper")}
                  aria-expanded={!isNavShown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="21"
                    viewBox="0 0 30 21"
                    fill="none"
                  >
                    <path d="M0 1.51891H30" stroke="black" strokeWidth="2" />
                    <path d="M0 10.5189H30" stroke="black" strokeWidth="2" />
                    <path d="M0 19.5189H30" stroke="black" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={cx("button-header")}></div>
              <div className={cx("navbar")}>
                <Link href="/" className={cx("logo")}>
                  <div className={cx("brand")}>
                    <Image
                      src={DaManLogo}
                      alt={"DaMan Logo"}
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className={cx("close-button")}>
                {/* close button */}
                {!isSearchShown ? (
                  <button
                    type="button"
                    className={cx("close-icon")}
                    onClick={() => {
                      setIsNavShown(!isNavShown);
                      setSearchQuery("");
                    }}
                    aria-label="Toggle navigation"
                    aria-controls={cx("full-menu-wrapper")}
                    aria-expanded={!isNavShown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                    >
                      <path
                        d="M2 2L44.5 44.5"
                        stroke="#9D9D9C"
                        strokeWidth="3"
                      />
                      <path
                        d="M44.5 2L2 44.5"
                        stroke="#9D9D9C"
                        strokeWidth="3"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={cx("close-icon")}
                    onClick={() => {
                      setIsNavShown(!isNavShown);
                      setSearchQuery("");
                      setIsSearchShown(!isSearchShown);
                    }}
                    aria-label="Toggle navigation"
                    aria-controls={cx("full-menu-wrapper")}
                    aria-expanded={!isNavShown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      viewBox="0 0 46 46"
                      fill="none"
                    >
                      <path
                        d="M2 2L44.5 44.5"
                        stroke="#9D9D9C"
                        strokeWidth="3"
                      />
                      <path
                        d="M44.5 2L2 44.5"
                        stroke="#9D9D9C"
                        strokeWidth="3"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>
      {/* Full menu */}
      <div
        className={cx([
          "full-menu-wrapper",
          isNavShown ? "show" : undefined,
          isScrolled ? "sticky" : undefined,
        ])}
      >
        <FullMenu
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          thirdMenuItems={thirdMenuItems}
          menusLoading={menusLoading}
          newCover={headerComponent?.newCoverIssue?.sourceUrl}
          subsLink={subsLink}
          clearSearch={clearSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchShown={isSearchShown}
          setSearchShown={setIsSearchShown}
        />
      </div>
      {/* Navigation menu */}
      <div
        className={cx("navigation-wrapper", isNavShown ? "hide" : undefined)}
      >
        <NavigationMenu
          className={cx("navigation-menu")}
          menuItems={navigationMenuItems}
        />
      </div>
    </>
  );
}

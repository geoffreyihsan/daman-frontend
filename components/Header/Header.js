import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import DaManLogo from "../../assets/logo/daman-logo.png";
import { FullMenu, Masthead, NavigationMenu } from "..";

let cx = classNames.bind(styles);

export default function Header({
  primaryMenuItems,
  secondaryMenuItems,
  thirdMenuItems,
  navigationMenuItems,
  menusLoading,
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // // Stop scrolling pages when isNavShown
  // useEffect(() => {
  //   if (isNavShown) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "visible";
  //   }
  // }, [isNavShown]);

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
      <Masthead />
      {/* Main Header */}
      <header className={cx("component", { sticky: isScrolled })}>
        <div className={cx("wrapper")}>
          {!isNavShown ? (
            <>
              <div className={cx("button-header")}>
                <Link href={"/subscribe-daman"}>{"Subscribe"}</Link>
              </div>

              <div className={cx("navbar")}>
                <div className={cx("brand")}>
                  <Link href="/" className={cx("logo")}>
                    <Image
                      src={DaManLogo}
                      alt={"DaMan Logo"}
                      fill
                      sizes="100%"
                    />
                  </Link>
                </div>
              </div>
              {/* Menu Button */}
              {isNavShown == false ? (
                <div className={cx("menu-button")}>
                  {/* menu button */}
                  <button
                    type="button"
                    className={cx("menu-icon")}
                    onClick={() => {
                      setIsNavShown(!isNavShown);
                      // setSearchQuery('')
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
              ) : (
                <div className={cx("menu-button")}>
                  {/* close button */}
                  <button
                    type="button"
                    className={cx("close-icon")}
                    onClick={() => {
                      setIsNavShown(!isNavShown);
                      // setSearchQuery("");
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
                </div>
              )}
            </>
          ) : (
            <>
              <div className={cx("button-header")}></div>

              <div className={cx("navbar")}>
                <div className={cx("brand")}>
                  <Link href="/" className={cx("logo")}>
                    <Image
                      src={DaManLogo}
                      alt={"DaMan Logo"}
                      fill
                      sizes="100%"
                    />
                  </Link>
                </div>
              </div>
              <div className={cx("close-button")}>
                {/* close button */}
                <button
                  type="button"
                  className={cx("close-icon")}
                  onClick={() => {
                    setIsNavShown(!isNavShown);
                    // setSearchQuery("");
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
                    <path d="M2 2L44.5 44.5" stroke="#9D9D9C" strokeWidth="3" />
                    <path d="M44.5 2L2 44.5" stroke="#9D9D9C" strokeWidth="3" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      {/* Full menu */}
      <div
        className={cx(["full-menu-wrapper", isNavShown ? "show" : undefined])}
      >
        <FullMenu
          primaryMenuItems={primaryMenuItems}
          secondaryMenuItems={secondaryMenuItems}
          thirdMenuItems={thirdMenuItems}
          menusLoading={menusLoading}
        />
      </div>
      {/* Navigation menu */}
      <div className={cx("navigation-wrapper")}>
        <NavigationMenu
          className={cx("navigation-menu")}
          menuItems={navigationMenuItems}
        />
      </div>
    </>
  );
}

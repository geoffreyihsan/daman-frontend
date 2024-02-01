import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {
  MastHeadBottom,
  MastHeadBottomMobile,
  NavigationMenu,
} from "../../components";
import dynamic from "next/dynamic";
import {
  LogoOfDa,
  LogoOfDai,
  LogoOfDamanFooter,
  LogoOfDamg,
  LogoOfPrestige,
  LogoOfScop3,
} from "../../public/logos/logos";

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

export default function Footer({ menuItems }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ResponsiveComponent
        ComponentMobile={MastHeadBottomMobile}
        ComponentDesktop={MastHeadBottom}
      />
      <footer className={cx("component")}>
        <div className={cx("footer-wrapper")}>
          <div className={cx("back-to-top")}>
            <button onClick={scrollToTop}>{"Back to Top"}</button>
          </div>
          <div className={cx("container-wrapper")}>
            <div className={cx("first-wrapper")}>
              <Link href={"https://destinasianmediagroup.com/home/"}>
                <div className={cx("damg-logo-wrapper")}>
                  <LogoOfDamg />
                </div>
              </Link>
              <div className={cx("description-wrapper")}>
                {
                  "© 2023 DestinAsian Media Group All rights reserved. Use of this site constitutes acceptance of our User Agreement (effective 21/12/2015) and Privacy Policy (effective 21/12/2015). The material on this site may not be reproduced, distributed, transmitted, cached or otherwise used, except with prior written permission of DestinAsian Media Group."
                }
              </div>
            </div>
            <div className={cx("second-wrapper")}>
              <NavigationMenu
                className={cx("footer-menu-wrapper")}
                menuItems={menuItems}
              />
              <div className={cx("footer-logo-wrapper")}>
                <Link href={"https://daman.co.id/"}>
                  <div className={cx("logo-wrapper")}>
                    <LogoOfDamanFooter />
                  </div>
                </Link>
                <Link href={"https://destinasian.com/"}>
                  <div className={cx("logo-wrapper")}>
                    <LogoOfDa />
                  </div>
                </Link>
                <Link href={"https://destinasian.co.id/"}>
                  <div className={cx("logo-wrapper")}>
                    <LogoOfDai />
                  </div>
                </Link>
                <Link href={"https://www.prestigeonline.com/id/"}>
                  <div className={cx("logo-wrapper")}>
                    <LogoOfPrestige />
                  </div>
                </Link>
                <Link href={"https://scop3group.com/"}>
                  <div className={cx("logo-wrapper")}>
                    <LogoOfScop3 />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <p className={cx("copyright")}>
            {/* {`${title} © ${year}`} */}
            {"DAMAN.CO.ID © 2023 design by lettercase creative network"}
          </p>
        </div>
      </footer>
    </>
  );
}

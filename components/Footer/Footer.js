import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { MastHeadBottom, MastHeadBottomMobile, NavigationMenu } from "../../components";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

// DAMG Logo
import damgLogo from "../../assets/logo/footer/damg_logo.png";
import daLogo from "../../assets/logo/footer/da_logo.png";
import damanLogo from "../../assets/logo/footer/daman_logo.png";
import daiLogo from "../../assets/logo/footer/dai_logo.png";
import prsLogo from "../../assets/logo/footer/prestige_logo.png";
import scop3Logo from "../../assets/logo/footer/scop3_logo.png";

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
                  <Image
                    src={damgLogo.src}
                    alt="Destinasian Media Group Logo"
                    fill
                    sizes="100%"
                    priority
                  />
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
                    <Image
                      src={damanLogo.src}
                      alt="DaMan Logo"
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
                <Link href={"https://destinasian.com/"}>
                  <div className={cx("logo-wrapper")}>
                    <Image
                      src={daLogo.src}
                      alt="Destinasian Logo"
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
                <Link href={"https://destinasian.co.id/"}>
                  <div className={cx("logo-wrapper")}>
                    <Image
                      src={daiLogo.src}
                      alt="Destinasian Indonesia Logo"
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
                <Link href={"https://www.prestigeonline.com/id/"}>
                  <div className={cx("logo-wrapper")}>
                    <Image
                      src={prsLogo.src}
                      alt="Prestige Logo"
                      fill
                      sizes="100%"
                      priority
                    />
                  </div>
                </Link>
                <Link href={"https://scop3group.com/"}>
                  <div className={cx("logo-wrapper")}>
                    <Image
                      src={scop3Logo.src}
                      alt="Scop3Group Logo"
                      fill
                      sizes="100%"
                      priority
                    />
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

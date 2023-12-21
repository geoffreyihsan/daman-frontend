import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./Main.module.scss";
import { Masthead } from "../../components";

let cx = classNames.bind(styles);

export default function Main({ children, className, ...props }) {
  // Google Ad Manager Id
  const bottomMobile = "1701941651336-0";
  const bottomDesktop = "1701941453692-0";

  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(["component", className])}
      {...props}
    >
      {children}
      <div className={cx("mobile-banner")}>
        {/* Masthead Top Mobile */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <!-- /6808792/DAMAN_MASTHEAD_BOTTOM_MOBILE -->
            <div id='div-gpt-ad-1701941651336-0' style='min-width: 300px; min-height: 250px;'>
              <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1701941651336-0'); });
              </script>
            </div>
          `,
          }}
        />
      </div>
      <div className={cx("desktop-banner")}>
        {/* Masthead Top Desktop */}
        <div id="div-gpt-ad-1701941037105-0" />
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <!-- /6808792/DAMAN_MASTHEAD_BOTTOM -->
            <div id='div-gpt-ad-1701941453692-0' style='min-width: 970px; min-height: 250px;'>
              <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1701941453692-0'); });
              </script>
            </div>
          `,
          }}
        />
      </div>
    </main>
  );
}

import classNames from "classnames/bind";
import styles from "./Masthead.module.scss";

let cx = classNames.bind(styles);

export default function Masthead() {
  return (
    <>
      <div className={cx("mobile-banner")}>
        {/* Masthead Top Mobile */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <!-- /6808792/DAMAN_MASTHEAD_TOP_MOBILE -->
            <div id='div-gpt-ad-1701941240723-0' style='min-width: 300px; min-height: 250px;'>
              <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1701941240723-0'); });
              </script>
            </div>
          `,
          }}
        />
      </div>
      <div className={cx("desktop-banner")}>
        {/* Masthead Top Desktop */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <!-- Leaderboard -->
            <div class="desktop-leaderboard">
            <div id='div-gpt-ad-1460363567691-1' style='height:90px; width:728px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1460363567691-1'); });
            </script>
            </div>
            </div>
            <!-- Mobile Leaderboard -->
            <div class="mobile-leaderboard">
            <div id='div-gpt-ad-1460363567691-2' style='height:50px; width:320px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1460363567691-2'); });
            </script>
            </div>
            </div>
          `,
          }}
        />
      </div>
    </>
  );
}

import Head from "next/head";

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url }) {
  if (!title && !description && !imageUrl && !url) {
    return null;
  }

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />
          </>
        )}

        {/* Inter Font Family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Google Ad Manager */}
        <script type="text/javascript">
          {`
          var googletag = googletag || {};
          googletag.cmd = googletag.cmd || [];
          (function() {
              var gads = document.createElement("script");
              gads.async = true;
              gads.type = "text/javascript";
              var useSSL = "https:" == document.location.protocol;
              gads.src = (useSSL ? "https:" : "http:") + "//securepubads.g.doubleclick.net/tag/js/gpt.js";
              var node = document.getElementsByTagName("script")[0];
              node.parentNode.insertBefore(gads, node);
          })();
        `}
        </script>
        <script type="text/javascript">
          {`
          googletag.cmd.push(function() {
            // Targeting based on your PHP logic
            if (typeof window !== 'undefined') {
              var address = window.location.pathname;
              googletag.pubads().setTargeting("URL_Exact", address);
            }
            googletag.defineSlot('/6808792/DAMAN_leaderboard', [728, 90], 'div-gpt-ad-1460363567691-1').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_mobile_leaderboard', [320, 50], 'div-gpt-ad-1460363567691-2').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP', [970, 250], 'div-gpt-ad-1701941037105-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP_MOBILE', [300, 250], 'div-gpt-ad-1701941240723-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM', [970, 250], 'div-gpt-ad-1701941453692-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM_MOBILE', [300, 250], 'div-gpt-ad-1701941651336-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_01', [300, 600], 'div-gpt-ad-1701941862020-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_02', [300, 600], 'div-gpt-ad-1701941963018-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_INTERSCROLLER', [300, 600], 'div-gpt-ad-1702016546215-0').addService(googletag.pubads());
            googletag.setCollapseEmptyDiv(true);
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
        </script>
      </Head>
    </>
  );
}

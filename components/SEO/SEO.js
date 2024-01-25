import Head from "next/head";
import { AdScript, AdConfig } from "react-ad-manager";
import { GetFavicon } from "../../queries/GetFavicon";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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
export default function SEO({ title, description, imageUrl, url, focuskw }) {
  const [locationPathname, setLocationPathname] = useState("");

  useEffect(() => {
    // Check if the window object is defined (for SSR compatibility)
    if (typeof window !== "undefined") {
      const currentPathname = window.location.pathname;
      setLocationPathname(currentPathname);
    }
  }, []); // Run this effect only once on component mount

  const { data } = useQuery(GetFavicon, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Get Favicon
  const favicon = data?.favicon;

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        {/* Favicon */}
        {favicon && (
          <link
            key={`fav-${favicon?.mediaDetails?.width}x${favicon?.mediaDetails?.height}`}
            rel="icon"
            type="image/png"
            sizes={`${favicon?.mediaDetails?.width}x${favicon?.mediaDetails?.height}`}
            href={favicon?.sourceUrl}
          />
        )}

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta itemProp="name" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta itemProp="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta itemProp="image" content={imageUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={"https://daman.co.id" + url} />
            <meta
              property="twitter:url"
              content={"https://daman.co.id" + url}
            />
          </>
        )}

        {focuskw && <meta name="keywords" content={focuskw} />}

        {/* SEM Keywords */}
        <meta
          name="keywords"
          content="in style magazine, Porsche, mens styles, male models, man fashion, men's watch, Bvlgari, Tag Heuer, Breitling, mens fashion, male fashion, top male models, mens fashion magazine, men outfits, Afgan, latest fashion for men, nicholas saputra, luxury men's watch, men's fashion trends, men's fashion styles, male grooming, men's designer, men's lifestyle, Swiss International Airlines, men's style magazine, men's watch trends, model indonesia, mens dressing style, male lifestyle, model hot indo, male supermodel, model pria indonesia, men's spring summer fashion, Ronald Liem, indonesia actor, indonesian male celebrity, men's horology, top model indo, Resor Mewah"
        />

        {/* Inter Font Family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CYBBEL8JS1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CYBBEL8JS1');
          `,
          }}
        ></script>

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W2MZPZT');
          `,
          }}
        ></script>
        {/* End Google Tag Manager */}

        {/* Google Ad Manager */}
        <AdScript />
        <AdConfig
          networkCode={6808792}
          target={[["URL_Exact", locationPathname]]}
          collapseEmptyDivs={true}
          // eventImpressionViewable={(e) => console.log(e.slot)}
          // eventSlotOnload={(e) => console.log(e.slot)}
          // eventSlotRenderEnded={(e) => console.log(e.slot)}
          // eventSlotRequested={(e) => console.log(e.slot)}
          // eventSlotResponseReceived={(e) => console.log(e.slot)}
          // eventSlotVisibilityChanged={(e) => console.log(e.slot)}
        />
        {/* <script type="text/javascript">
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
        </script> */}
        {/* <script>
          {`
          googletag.cmd.push(function() {
            // Targeting based on your PHP logic
            if (typeof window !== 'undefined') {
              var address = window.location.pathname;
              googletag.pubads().setTargeting("URL_Exact", address);
            }
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP', [970, 250], 'div-gpt-ad-1701941037105-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP_MOBILE', [300, 250], 'div-gpt-ad-1701941240723-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM', [970, 250], 'div-gpt-ad-1701941453692-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM_MOBILE', [300, 250], 'div-gpt-ad-1701941651336-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_01', [300, 600], 'div-gpt-ad-1701941862020-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_02', [300, 600], 'div-gpt-ad-1701941963018-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_INTERSCROLLER', [300, 600], 'div-gpt-ad-1702016546215-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
        </script> */}
        {/* Frmwrk Tracking Code */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "h4u234tj5r");
          `,
          }}
        ></script> */}
        {/* End Frmwrk Tracking Code */}
      </Head>
    </>
  );
}

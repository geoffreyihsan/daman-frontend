import Head from "next/head";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
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

        {/* Google Ad Manager */}
        <AdScript />
        <AdConfig
          networkCode={6808792}
          target={[["URL_Exact", locationPathname]]}
          collapseEmptyDivs={true}
        />
      </Head>

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-W2MZPZT" />

      {/* Frmwrk Tracking Code */}
      <Script
        beforeInteractive
        id="frmwrk-script"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "h4u234tj5r");`,
        }}
      />
      {/* End Frmwrk Tracking Code */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W2MZPZT"
          height="0"
          width="0"
          className="invisible hidden"
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
}

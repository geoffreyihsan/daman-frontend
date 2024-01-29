import className from "classnames/bind";
import styles from "./ContentWrapper.module.scss";
import { Interscroller } from "../../components";
import { GetSingleTags } from "../../queries/GetSingleTags";
import { useQuery } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

let cx = className.bind(styles);

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

export default function ContentWrapper({
  content,
  databaseId,
  className,
  single,
}) {
  const [transformedContent, setTransformedContent] = useState("");

  useEffect(() => {
    // Function to extract image data and replace <img> with <Image>
    const extractImageData = () => {
      // Create a DOMParser
      const parser = new DOMParser();

      // Parse the HTML content
      const doc = parser.parseFromString(content, "text/html");

      // Get all image elements
      const imageElements = doc.querySelectorAll("img");

      // Replace <img> elements with <Image> components
      imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        const width = img.getAttribute("width");
        const height = img.getAttribute("height");

        // Create Image component
        const imageComponent = (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ objectFit: "contain" }}
            priority
          />
        );

        // Render the Image component to HTML string
        const imageHtmlString = renderToStaticMarkup(imageComponent);

        // Replace the <img> element with the Image HTML string in the HTML content
        img.outerHTML = imageHtmlString;
      });

      // Set the transformed HTML content
      setTransformedContent(doc.body.innerHTML);
    };

    // Call the function to extract image data and replace <img>
    extractImageData();
  }, [content]);

  // Get Tag in Single
  const { data, loading } = useQuery(GetSingleTags, {
    variables: {
      // Single id
      id: databaseId,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  // All tags in single
  const singleTags = data?.post?.tags?.edges ?? [];

  return (
    <>
      <article className={cx(["component", className])}>
        <div dangerouslySetInnerHTML={{ __html: transformedContent ?? "" }} />
      </article>
      {/* Tag under post content */}
      {single !== "backissue" && single !== "contest" && (
        <div className={cx("tag-wrapper")}>
          <div className={cx("tag-title")}>{"Tagged in: "}</div>
          <div className={cx("tag-name-wrapper")}>
            {singleTags.map((post, index) => (
              <div className={cx("tag-name")} key={post?.node?.name}>
                {/* Add a key for efficient rendering */}
                {post?.node?.name && post?.node?.uri && (
                  <Link href={post?.node?.uri}>
                    <h2>
                      {index < singleTags.length - 1 ? (
                        <>
                          {post?.node?.name}
                          {","}{" "}
                        </>
                      ) : (
                        post?.node?.name
                      )}
                    </h2>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <ResponsiveComponent
        ComponentMobile={Interscroller}
        ComponentDesktop={"null"}
      />
    </>
  );
}

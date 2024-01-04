import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./ContentWrapper.module.scss";
import { Interscroller } from "../../components";

let cx = className.bind(styles);

export default function ContentWrapper({ content, children, className }) {
  // const [shouldShowInterscroller, setShouldShowInterscroller] = useState(false);

  // useEffect(() => {
  //   // Helper function to count paragraphs in the content
  //   const countParagraphs = (html) => {
  //     const div = document.createElement("div");
  //     div.innerHTML = html;
  //     const paragraphs = div.querySelectorAll("p");
  //     return paragraphs.length;
  //   };

  //   // Determine if the Interscroller should be shown
  //   const paragraphsCount = countParagraphs(content);
  //   setShouldShowInterscroller(paragraphsCount >= 5);
  // }, [content]);

  return (
    <>
      <article className={cx(["component", className])}>
        <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
        {children}
      </article>
      <Interscroller />
    </>
  );
}

import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import Image from "next/image";

let cx = classNames.bind(styles);

export default function Post({ title, uri, featuredImage, excerpt, category }) {
  const calculateTrimmedExcerpt = (excerpt) => {
    const MAX_EXCERPT_LENGTH = 150; // You can adjust this value according to your needs

    let trimmedExcerpt = excerpt?.substring(0, MAX_EXCERPT_LENGTH);
    const lastSpaceIndex = trimmedExcerpt?.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      trimmedExcerpt = trimmedExcerpt?.substring(0, lastSpaceIndex);
    }

    return `${trimmedExcerpt}`;
  };

  return (
    <article className={cx("component")}>
      {featuredImage && uri && (
        <div className={cx("image-wrapper")}>
          <Link href={uri}>
            <Image
              src={featuredImage?.sourceUrl}
              alt={featuredImage?.alt ?? "Post Featured Image"}
              fill
              sizes="100%"
            />
          </Link>
        </div>
      )}
      {category && (
        <div className={cx("category-wrapper")}>
          <Link href={category?.node?.uri}>
            <h2>
              {category.node?.parent &&
                category.node?.parent?.node?.name + " | "}
              {category.node?.name}
            </h2>
          </Link>
        </div>
      )}
      {title && uri && (
        <div className={cx("title-wrapper")}>
          <Link href={uri}>
            <h2>{title}</h2>
          </Link>
        </div>
      )}
      {excerpt && uri && (
        <div className={cx("excerpt-wrapper")}>
          <Link href={uri}>
            <div
              dangerouslySetInnerHTML={{
                __html: calculateTrimmedExcerpt(excerpt),
              }}
            />
          </Link>
        </div>
      )}
    </article>
  );
}

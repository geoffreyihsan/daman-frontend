import Link from "next/link";
import classNames from "classnames/bind";
import { FeaturedImage, PostInfo } from "../..";
import styles from "./TwoColumns.module.scss";

let cx = classNames.bind(styles);

export default function TwoColumns({
  title,
  content,
  date,
  author,
  uri,
  featuredImage,
}) {
  return (
    <article className={cx("component")}>
      {featuredImage && (
        <Link href={uri}>
          <FeaturedImage
            image={featuredImage}
            className={cx("featured-image")}
          />
        </Link>
      )}

      <Link href={uri}>
        <h2>{title}</h2>
      </Link>
      <PostInfo date={date} author={author} className={cx("post-info")} />
      <div
        className={cx("content")}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

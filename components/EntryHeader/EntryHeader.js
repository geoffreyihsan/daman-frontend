import className from "classnames/bind";
import { Heading, PostInfo, BorderDivider } from "../../components";
import styles from "./EntryHeader.module.scss";
import Image from "next/image";

let cx = className.bind(styles);

export default function EntryHeader({ title, image, date, author, className }) {
  const hasText = title || date || author;

  return (
    <div className={cx(["component", className])}>
      {image && (
        <div className={cx("image-wrapper")}>
          <Image
            src={image?.sourceUrl}
            altText={
              image?.altText ? image?.altText : "Single Post Featured Image"
            }
            className={cx("featured-image")}
            fill
            sizes="100%"
          />
        </div>
      )}

      {hasText && (
        <div className={cx("text", { "has-image": image })}>
          <>
            {!!title && <Heading className={cx("title")}>{title}</Heading>}
            <PostInfo className={cx("byline")} author={author} date={date} />
          </>
        </div>
      )}
    </div>
  );
}

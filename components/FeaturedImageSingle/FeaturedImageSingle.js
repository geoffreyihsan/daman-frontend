import className from "classnames/bind";
import styles from "./FeaturedImageSingle.module.scss";
import Image from "next/image";

let cx = className.bind(styles);

export default function FeaturedImageSingle({ image, className }) {
  return (
    <div className={cx(["component", className])}>
      {image && (
        <div className={cx("image-wrapper")}>
          <Image
            src={image?.sourceUrl}
            alt={
              image?.altText ? image?.altText : "Single Post Featured Image"
            }
            className={cx("featured-image")}
            fill
            sizes="100%"
            priority
          />
        </div>
      )}
    </div>
  );
}

import className from "classnames/bind";
import { Heading, PostInfo, BorderDivider } from "../../components";
import styles from "./EntryHeader.module.scss";
import Link from "next/link";

let cx = className.bind(styles);

export default function EntryHeader({
  title,
  date,
  categories,
  className,
}) {
  return (
    <div className={cx(["component", className])}>
      {categories && (
        <div className={cx("category-wrapper")}>
          <Link href={categories.node?.uri}>
            {categories.node?.parent &&
              categories.node?.parent?.node?.name + " | "}
            {categories.node?.name}
          </Link>
        </div>
      )}
      {title && (
        <div className={cx("title-wrapper")}>
          <Heading className={cx("title")}>{title}</Heading>
        </div>
      )}
      {date && (
        <div className={cx("meta-wrapper")}>
          <PostInfo className={cx("meta")} date={date} />
        </div>
      )}
    </div>
  );
}

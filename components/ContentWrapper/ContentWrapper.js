import className from "classnames/bind";
import styles from "./ContentWrapper.module.scss";
import { Interscroller } from "../../components";
import { GetSingleTags } from "../../queries/GetSingleTags";
import { useQuery } from "@apollo/client";
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
  children,
  databaseId,
  className,
  single,
}) {

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
        <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
        {children}
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

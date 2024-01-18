import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PostTag.module.scss";
import { useQuery } from "@apollo/client";
import { GetPostTag } from "../../queries/GetPostTag";
import { Post, Button } from "../../components";

let cx = classNames.bind(styles);

export default function PostTag(databaseId) {
  // Fetching Posts
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  // Post per fetching
  const postsPerPage = 6;

  let storiesVariable = {
    first: postsPerPage,
    after: null,
    id: databaseId?.databaseId,
  };

  // Get Stories / Posts
  const { data, error, loading, fetchMore } = useQuery(GetPostTag, {
    variables: storiesVariable,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;

    const prevEdges = prev?.tag?.contentNodes?.edges || [];
    const newEdges = fetchMoreResult?.tag?.contentNodes?.edges || [];

    return {
      ...prev,
      tag: {
        ...prev.tag,
        contentNodes: {
          ...prev.tag.contentNodes,
          edges: [...prevEdges, ...newEdges],
          pageInfo: fetchMoreResult.tag.contentNodes.pageInfo,
        },
      },
    };
  };

  // Function to fetch more posts
  const fetchMorePosts = () => {
    if (!isFetchingMore && data?.tag?.contentNodes?.pageInfo?.hasNextPage) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          after: data?.tag?.contentNodes?.pageInfo?.endCursor,
        },
        updateQuery,
      }).then(() => {
        setIsFetchingMore(false); // Reset the flag after fetch is done
      });
    }
  };

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  // Loading Menu
  if (loading) {
    return (
      <>
        <div className="my-0 pb-4 px-4 flex max-w-[100vw] justify-start lg:max-w-[1024px] lg:px-0 ">
          <Button className="gap-x-4	">{"Loading..."}</Button>
        </div>
      </>
    );
  }

  // Declare all posts
  const allPosts = data?.tag?.contentNodes?.edges.map((post) => post.node);

  return (
    <div className={cx("component")}>
      {allPosts.length !== 0 &&
        allPosts.map((post) => (
          <React.Fragment key={post?.id}>
            <Post
              title={post?.title}
              uri={post?.uri}
              featuredImage={post?.featuredImage?.node}
              excerpt={post?.excerpt}
              category={post?.categories?.edges[0]}
            />
          </React.Fragment>
        ))}
      {allPosts.length && (
        <div className="my-0 flex max-w-[100vw] justify-start lg:max-w-[1024px] ">
          {data?.tag?.contentNodes?.pageInfo?.hasNextPage &&
            data?.tag?.contentNodes?.pageInfo?.endCursor && (
              <Button onClick={fetchMorePosts} className="gap-x-4	">
                {isFetchingMore ? "Loading..." : "Load More"}
              </Button>
            )}
        </div>
      )}
    </div>
  );
}

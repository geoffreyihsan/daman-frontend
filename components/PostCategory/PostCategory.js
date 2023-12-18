import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PostCategory.module.scss";
import { useQuery } from "@apollo/client";
import { GetPostCategory } from "../../queries/GetPostCategory";
import { Post, Button, TwoColumns } from "../../components";

let cx = classNames.bind(styles);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function PostCategory(databaseId) {
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
  const { data, error, loading, fetchMore } = useQuery(GetPostCategory, {
    variables: storiesVariable,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;

    const prevEdges = prev?.category?.contentNodes?.edges || [];
    const newEdges = fetchMoreResult?.category?.contentNodes?.edges || [];

    return {
      ...prev,
      category: {
        ...prev.category,
        contentNodes: {
          ...prev.category.contentNodes,
          edges: [...prevEdges, ...newEdges],
          pageInfo: fetchMoreResult.category.contentNodes.pageInfo,
        },
      },
    };
  };

  // Function to fetch more posts
  const fetchMorePosts = () => {
    if (
      !isFetchingMore &&
      data?.category?.contentNodes?.pageInfo?.hasNextPage
    ) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          after: data?.category?.contentNodes?.pageInfo?.endCursor,
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
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          <Button className="gap-x-4	">{"Loading..."}</Button>
        </div>
      </>
    );
  }

  const allPosts = [];

  // loop through all the latest categories posts
  data?.category?.contentNodes?.edges?.forEach((post) => {
    allPosts.push(post.node);
  });

  return (
    <div className={cx("component")}>
      {allPosts.length !== 0 &&
        allPosts.map((post, index) => (
          <Post
            title={post?.title}
            uri={post?.uri}
            featuredImage={post?.featuredImage?.node}
            excerpt={post?.excerpt}
            category={post?.categories?.edges[0]}
          />
        ))}
      {allPosts.length && (
        <div className="mx-auto my-0 flex max-w-[100vw] justify-center md:max-w-[700px]	">
          {data?.category?.contentNodes?.pageInfo?.hasNextPage &&
            data?.category?.contentNodes?.pageInfo?.endCursor && (
              <Button
                onClick={() => {
                  if (
                    !isFetchingMore &&
                    data?.category?.contentNodes?.pageInfo?.hasNextPage
                  ) {
                    fetchMorePosts();
                  }
                }}
                className="gap-x-4	"
              >
                {isFetchingMore ? "Loading..." : <>Load More </>}
              </Button>
            )}
        </div>
      )}
    </div>
  );
}

import { useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import styles from "./FullMenu.module.scss";
import { useState, useEffect, useRef } from "react";
import { GetSearchResults } from "../../queries/GetSearchResults";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  SearchInput,
  SearchResults,
  Button,
} from "../../components";

let cx = classNames.bind(styles);

export default function FullMenu({
  primaryMenuItems,
  secondaryMenuItems,
  menusLoading,
  newCover,
  subsLink,
  searchQuery,
  setSearchQuery,
  searchShown,
  setSearchShown,
}) {
  // Loading Menu
  if (menusLoading) {
    return (
      <>
        <div className={cx("loading-wrapper")}>
          <div role="status">
            <svg
              aria-hidden="true"
              className={cx("loading-icon")}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }

  // Search function content
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const postsPerPage = 100;
  // Input text
  const inputRef = useRef(null);
  // Function to focus on the input when a button is clicked
  const focusInput = () => {
    inputRef.current.focus();
  };

  // Add search query function
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error: searchResultsError,
    fetchMore,
  } = useQuery(GetSearchResults, {
    variables: {
      first: postsPerPage,
      after: null,
      search: searchQuery,
    },
    skip: searchQuery.length === 0,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  // Update query when load more button clicked
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult.tags.edges.length) {
      return previousResult.tags;
    }

    return {
      tags: {
        ...previousResult.tags,
        edges: [...previousResult.tags.edges, ...fetchMoreResult.tags.edges],
        pageInfo: fetchMoreResult.tags.pageInfo,
      },
    };
  };

  // Function to fetch more posts
  const fetchMorePosts = () => {
    if (!isFetchingMore && searchResultsData?.tags?.pageInfo?.hasNextPage) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          after: searchResultsData?.tags?.pageInfo?.endCursor,
        },
        updateQuery,
      }).then(() => {
        setIsFetchingMore(false); // Reset the flag after fetch is done
      });
    }
  };

  // Clear and focus the input on initial render
  useEffect(() => {
    inputRef.current.value = "";
  }, []);

  // Check if the search query is empty and no search results are loading, then hide the SearchResults component
  const isSearchResultsVisible = !!searchQuery;

  // Create a Set to store unique databaseId values
  const uniqueDatabaseIds = new Set();

  // Initialize an array to store unique posts
  const contentNodesPosts = [];

  // Loop through all the contentNodes posts
  searchResultsData?.tags?.edges.forEach((contentNodes) => {
    contentNodes.node?.contentNodes?.edges.forEach((post) => {
      const { databaseId } = post.node;

      // Check if the databaseId is unique (not in the Set)
      if (!uniqueDatabaseIds.has(databaseId)) {
        uniqueDatabaseIds.add(databaseId); // Add the databaseId to the Set
        contentNodesPosts.push(post.node); // Push the unique post to the array
      }
    });
  });

  // Sort contentNodesPosts array by date
  contentNodesPosts.sort((a, b) => {
    // Assuming your date is stored in 'date' property of the post objects
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Compare the dates
    return dateB - dateA;
  });

  return (
    <div className={cx("component")}>
      {/* Full menu */}
      <div className={cx("full-menu-content")}>
        <div className={cx("menu-wrapper")}>
          {/* New Cover Image */}
          <div className={cx("first-wrapper")}>
            {subsLink && newCover && (
              <Link href={subsLink}>
                <div className={cx("image-wrapper")}>
                  <Image
                    src={newCover}
                    alt={"New Issue Image"}
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
              </Link>
            )}
          </div>
          {/* Newsletter & Subscribe */}
          <div className={cx("second-wrapper")}>
            <NavigationMenu
              className={cx("primary-navigation")}
              menuItems={primaryMenuItems}
            />
          </div>
          {/* Category Menu */}
          <div className={cx("third-wrapper")}>
            <NavigationMenu
              className={cx("secondary-navigation")}
              menuItems={secondaryMenuItems}
            />
          </div>
          {/* Search & Socmed */}
          <div className={cx("fourth-wrapper")}>
            <nav>
              <ul className={cx("menu")}>
                <li>
                  <button
                    type="button"
                    className={cx("search-button")}
                    onClick={() => {
                      setSearchShown(!searchShown);
                      setSearchQuery("");
                      focusInput();
                    }}
                    aria-label="Toggle navigation"
                    aria-controls={cx("search-bar-wrapper")}
                    aria-expanded={!searchShown}
                  >
                    <a>{"Search"}</a>
                  </button>
                </li>
              </ul>
            </nav>
            <div className={cx("socmed-wrapper")}>
              {/* facebook */}
              <Link href={"https://www.facebook.com/daman.mag"}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="32"
                  viewBox="0 0 267.000000 502.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,502.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M1627 5004 c-231 -42 -419 -145 -589 -323 -140 -147 -226 -308 -271
-506 -18 -83 -20 -134 -24 -632 l-5 -543 -326 0 c-309 0 -329 -1 -360 -20 -18
-11 -37 -32 -42 -46 -6 -14 -10 -169 -10 -366 0 -370 2 -382 57 -407 16 -7
138 -11 353 -11 l330 0 0 -1044 0 -1044 27 -6 c192 -40 528 -63 708 -50 l120
9 3 1068 2 1067 436 0 c587 0 538 -31 590 378 38 301 40 332 20 370 -19 36
-65 78 -99 91 -19 7 -187 11 -488 11 l-459 0 0 404 c0 372 2 409 19 467 46
146 168 256 319 288 32 7 167 11 347 11 207 0 302 4 320 12 53 24 55 37 55
419 l0 351 -34 34 -34 34 -444 -1 c-335 -1 -462 -4 -521 -15z"
                    />
                  </g>
                </svg>
              </Link>

              {/* instagram */}
              <Link href={"https://instagram.com/daman_magazine"}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="32"
                  viewBox="0 0 500.000000 503.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,503.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M1004 5015 c-250 -43 -478 -159 -654 -335 -145 -143 -243 -302 -311
-505 l-34 -100 0 -1550 0 -1550 28 -90 c150 -479 546 -809 1035 -865 68 -8
522 -10 1492 -8 1534 4 1426 0 1620 64 225 75 441 233 588 429 61 82 151 260
182 360 51 170 50 134 50 1655 0 1211 -2 1430 -15 1503 -51 291 -203 552 -427
731 -151 121 -286 189 -488 245 l-95 26 -1445 2 c-1183 1 -1460 -1 -1526 -12z
m2911 -442 c114 -32 268 -112 343 -177 146 -129 227 -253 285 -441 l22 -70 3
-1324 c2 -1180 1 -1334 -13 -1410 -31 -165 -104 -308 -219 -428 -125 -132
-262 -213 -428 -253 -81 -19 -119 -20 -1413 -20 -1294 0 -1332 1 -1413 20
-306 73 -544 304 -634 615 l-23 80 0 1355 c0 1476 -4 1377 54 1531 103 275
382 493 686 538 33 5 647 8 1365 7 l1305 -1 80 -22z"
                    />
                    <path
                      d="M3833 4159 c-142 -27 -241 -179 -204 -316 32 -118 129 -193 250 -193
160 0 273 123 258 281 -13 150 -155 256 -304 228z"
                    />
                    <path
                      d="M2305 3805 c-182 -29 -380 -107 -537 -211 -38 -26 -110 -85 -160
-132 -461 -439 -541 -1129 -192 -1654 198 -297 497 -496 851 -564 119 -23 338
-23 458 0 409 79 738 323 923 683 101 197 143 370 143 593 0 355 -128 667
-375 914 -187 186 -412 308 -671 361 -111 23 -328 28 -440 10z m405 -446 c155
-40 292 -121 411 -246 159 -166 239 -366 239 -594 0 -238 -93 -454 -268 -621
-97 -93 -205 -158 -332 -200 -91 -31 -102 -32 -255 -33 -137 0 -171 3 -238 23
-304 88 -526 316 -610 627 -29 111 -29 305 2 420 62 238 237 452 455 559 189
93 395 116 596 65z"
                    />
                  </g>
                </svg>
              </Link>

              {/* twitter */}
              <Link href={"https://twitter.com/daman_magazine"}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="32"
                  viewBox="0 0 524.000000 461.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,461.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M38 4583 c11 -16 437 -602 946 -1303 l926 -1274 -38 -41 c-22 -22
-418 -440 -882 -930 -464 -490 -873 -920 -909 -957 l-65 -68 344 0 345 1 748
789 c412 435 752 790 755 790 4 -1 265 -356 580 -790 l573 -790 935 0 c746 0
934 3 928 13 -5 6 -446 615 -981 1351 l-974 1340 39 40 c184 193 1721 1817
1736 1834 l19 22 -340 0 -340 0 -702 -740 c-386 -407 -705 -740 -709 -740 -4
1 -248 333 -542 740 l-535 739 -938 0 -938 1 19 -27z m2908 -2263 c722 -993
1313 -1808 1313 -1812 1 -5 -144 -8 -321 -8 l-323 0 -1310 1802 c-720 991
-1311 1808 -1313 1815 -3 11 57 13 319 11 l323 -3 1312 -1805z"
                    />
                  </g>
                </svg>
              </Link>

              {/* youtube */}
              <Link href={"https://www.youtube.com/user/DamanMagazineConnect"}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="32"
                  viewBox="0 0 705.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M730 5101 c-340 -72 -607 -315 -709 -645 l-21 -68 0 -1830 0 -1830
31 -92 c73 -219 229 -407 432 -520 81 -46 222 -92 322 -106 58 -8 832 -10
2780 -8 l2700 3 77 22 c175 50 309 126 428 243 119 117 209 277 252 446 l23
89 0 1760 0 1760 -26 96 c-92 330 -326 564 -670 671 l-74 23 -2730 2 c-2596 2
-2734 1 -2815 -16z m2902 -1958 c718 -361 775 -391 805 -430 66 -89 66 -217 0
-306 -30 -39 -87 -69 -805 -429 l-772 -388 -68 0 c-82 0 -134 22 -183 77 -73
81 -70 37 -67 908 l3 780 22 41 c25 46 82 100 127 120 17 7 61 13 98 14 l68 0
772 -387z"
                    />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div
        className={cx(["search-bar-wrapper", searchShown ? "show" : undefined])}
      >
        <div className={cx("search-input-wrapper")}>
          <SearchInput
            inputRef={inputRef}
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
            setSearchShown={setSearchShown}
            searchShown={searchShown}
          />
        </div>
        <div className={cx("search-result-wrapper")}>
          {searchResultsError && (
            <div className={cx("alert-error")}>
              {"An error has occurred. Please refresh and try again."}
            </div>
          )}

          {/* Conditionally render the SearchResults component */}
          {isSearchResultsVisible && (
            <SearchResults
              searchResults={contentNodesPosts}
              isLoading={searchResultsLoading}
            />
          )}
          {searchResultsData?.tags?.pageInfo?.hasNextPage &&
            searchResultsData?.tags?.pageInfo?.endCursor && (
              <div className="mx-auto my-0 flex w-[100vw] justify-center	">
                <Button onClick={fetchMorePosts} className="gap-x-4 my-4">
                  {isFetchingMore ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

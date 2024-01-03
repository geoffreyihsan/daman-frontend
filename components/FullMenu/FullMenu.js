import { useQuery } from "@apollo/client";
import classNames from "classnames/bind";
import styles from "./FullMenu.module.scss";
import { useState } from "react";
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
  thirdMenuItems,
  menusLoading,
  newCover,
  subsLink,
  clearSearch,
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
  // const [isSearchShown, setIsSearchShown] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const postsPerPage = 5;

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
    skip: searchQuery === "",
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

  return (
    <div className={cx("component")}>
      {/* Full menu */}
      <div className={cx("full-menu-content")}>
        <div className={cx("menu-wrapper")}>
          <div className={cx("first-wrapper")}>
            <div className={cx("image-wrapper")}>
              {subsLink && newCover && (
                <Link href={subsLink}>
                  <Image src={newCover} alt={"New Issue"} fill sizes="100%" />
                </Link>
              )}
            </div>
          </div>
          <div className={cx("second-wrapper")}>
            {/* Primary Menu {Destination Guides Menu} */}
            <NavigationMenu
              className={cx("primary-navigation")}
              menuItems={primaryMenuItems}
            />
          </div>
          <div className={cx("third-wrapper")}>
            {/* Secondary Menu {Destinations Menu} */}
            {/* Search Bar */}
            <NavigationMenu
              className={cx("secondary-navigation")}
              menuItems={secondaryMenuItems}
            />
          </div>
          <div className={cx("fourth-wrapper")}>
            {/* Third Menu {Destinations Menu} */}
            {/* <NavigationMenu
              className={cx("third-navigation")}
              menuItems={thirdMenuItems}
            /> */}
            <nav>
              <ul className={cx("menu")}>
                <li>
                  <button
                    type="button"
                    className={cx("search-button")}
                    onClick={() => {
                      setSearchShown(!searchShown);
                      // setSearchQuery('')
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="253"
                height="27"
                viewBox="0 0 253 27"
                fill="none"
              >
                <path
                  d="M14.0325 11.6692L13.6957 14.3597C13.6387 14.8092 13.2561 15.1473 12.8024 15.1473H8.42334V26.3964C7.96142 26.4379 7.4934 26.4591 7.0203 26.4591C5.96216 26.4591 4.92947 26.3539 3.93137 26.1534V15.1473H0.561624C0.252324 15.1473 0 14.8952 0 14.5865V11.2198C0 10.911 0.252324 10.659 0.561624 10.659H3.93035V5.60988C3.93035 2.51139 6.44443 0 9.54659 0H13.4769C13.7862 0 14.0386 0.25205 14.0386 0.560785V3.92752C14.0386 4.23626 13.7862 4.48831 13.4769 4.48831H10.6688C9.42856 4.48831 8.42334 5.49246 8.42334 6.73246V10.66H13.1402C13.6814 10.659 14.0996 11.1337 14.0325 11.6692Z"
                  fill="black"
                />
                <path
                  d="M53.4314 0H39.7455C36.219 0 33.3589 2.86007 33.3589 6.3866V20.0725C33.3589 23.5991 36.219 26.4591 39.7455 26.4591H53.4314C56.958 26.4591 59.818 23.5991 59.818 20.0725V6.3866C59.818 2.86007 56.9567 0 53.4314 0ZM57.5368 19.6155C57.5368 22.1341 55.493 24.1779 52.9744 24.1779H40.2012C37.6826 24.1779 35.6388 22.1341 35.6388 19.6155V6.84234C35.6388 4.32375 37.6826 2.27993 40.2012 2.27993H52.9744C55.493 2.27993 57.5368 4.32375 57.5368 6.84234V19.6155Z"
                  fill="black"
                />
                <path
                  d="M46.6019 6.38647C42.8252 6.38647 39.7595 9.4522 39.7595 13.2288C39.7595 17.0054 42.8252 20.0711 46.6019 20.0711C50.3785 20.0711 53.4442 17.0054 53.4442 13.2288C53.4442 9.4522 50.3785 6.38647 46.6019 6.38647ZM46.6019 17.7912C44.0883 17.7912 42.0395 15.7423 42.0395 13.2288C42.0395 10.7153 44.0883 8.66641 46.6019 8.66641C49.1154 8.66641 51.1643 10.7153 51.1643 13.2288C51.1643 15.7423 49.1154 17.7912 46.6019 17.7912Z"
                  fill="black"
                />
                <path
                  d="M53.9 7.29943C54.6557 7.29943 55.2684 6.68675 55.2684 5.93097C55.2684 5.17518 54.6557 4.5625 53.9 4.5625C53.1442 4.5625 52.5315 5.17518 52.5315 5.93097C52.5315 6.68675 53.1442 7.29943 53.9 7.29943Z"
                  fill="black"
                />
                <path
                  d="M96.3908 12.5234L105.903 2.50195H102.291L94.825 10.3689L89.1075 2.50195H79.2275L89.2282 16.2633L79.2275 26.8012H82.8396L90.7952 18.4189L96.8867 26.8012H106.767L96.3908 12.5234ZM84.3178 5.07958H87.7618L101.675 24.2235H98.2312L84.3178 5.07958Z"
                  fill="black"
                />
                <path
                  d="M141.993 19.5516V7.91331C141.993 7.91331 143.325 10.1003 148.139 10.2339C148.396 10.241 148.608 10.0329 148.608 9.77993V6.49119C148.608 6.24648 148.41 6.05261 148.162 6.03842C144.428 5.83036 142.655 3.00857 142.481 0.420845C142.465 0.182051 142.253 0 142.008 0H138.201C137.947 0 137.741 0.202148 137.741 0.452763V18.9522C137.741 20.9619 136.182 22.7103 134.145 22.8049C131.816 22.9136 129.922 20.9442 130.21 18.6165C130.414 16.9721 131.753 15.6257 133.419 15.3975C133.75 15.3526 134.073 15.349 134.386 15.3833C134.663 15.4141 134.907 15.2107 134.907 14.9365V11.6395C134.907 11.4054 134.726 11.2021 134.488 11.1879C134.01 11.1571 133.521 11.1678 133.024 11.2233C129.351 11.6335 126.388 14.5617 125.981 18.1815C125.444 22.9562 129.224 26.9979 133.962 26.9979C138.398 26.9979 141.995 23.455 141.995 19.0846"
                  fill="black"
                />
                <path
                  d="M181.514 0.00730648C174.566 0.233581 168.829 5.85991 168.48 12.802C168.355 15.3046 168.907 17.6703 169.98 19.7238L168.472 26.4781C168.409 26.7836 168.679 27.054 168.985 26.9906L175.739 25.4825H175.744C177.784 26.5482 180.124 27.1003 182.609 26.9849C189.54 26.6636 195.184 20.9694 195.452 14.0364C195.755 6.18348 189.355 -0.247253 181.514 0.00730648ZM181.963 24.2063C179.999 24.2063 178.159 23.6757 176.577 22.7491C176.428 22.6653 176.284 22.5771 176.144 22.4832L171.829 23.6327L172.979 19.3176C171.889 17.642 171.257 15.6452 171.257 13.499C171.257 7.59657 176.06 2.79275 181.963 2.79275C187.865 2.79275 192.669 7.59657 192.669 13.499C192.669 19.4013 187.865 24.2063 181.963 24.2063Z"
                  fill="black"
                />
                <path
                  d="M188.312 18.2134C188.125 18.494 187.93 18.7554 187.616 19.0676C186.931 19.7532 185.978 20.0994 185.012 20.001C183.281 19.8234 180.821 18.8674 178.707 16.7574C176.592 14.6428 175.636 12.1832 175.463 10.4522C175.365 9.48602 175.711 8.53453 176.396 7.84779C176.709 7.53553 176.97 7.33867 177.251 7.14747C177.769 6.79787 178.474 7.03094 178.669 7.61925L179.379 9.74737C179.574 10.3312 179.486 10.7 179.234 10.9466L178.669 11.5168C178.389 11.7974 178.342 12.2307 178.557 12.5668C178.87 13.0566 179.458 13.8407 180.541 14.9234C181.623 16.0061 182.407 16.5944 182.897 16.9067C183.233 17.1217 183.668 17.0753 183.947 16.7947L184.517 16.2301C184.765 15.9778 185.134 15.8896 185.717 16.0853L187.845 16.7947C188.433 16.9904 188.667 17.6953 188.312 18.2134Z"
                  fill="black"
                />
                <path
                  d="M247.515 0H220.075C217.364 0 215.165 2.20008 215.165 4.9117V22.0858C215.165 24.799 217.364 26.9975 220.075 26.9975H247.515C250.225 26.9975 252.424 24.799 252.424 22.0858V4.9117C252.424 2.20008 250.225 0 247.515 0ZM238.202 14.6838L230.571 18.5003C229.69 18.9412 228.655 18.3014 228.655 17.3168V9.68389C228.655 8.69931 229.691 8.05949 230.571 8.49886L238.202 12.3153C239.176 12.8028 239.176 14.1963 238.202 14.6838Z"
                  fill="black"
                />
              </svg>
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
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
            clearSearch={clearSearch}
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
                <Button
                  onClick={() => {
                    if (
                      !isFetchingMore &&
                      searchResultsData?.tags?.pageInfo?.hasNextPage
                    ) {
                      setIsFetchingMore(true); // Set flag to indicate fetch in progress
                      fetchMore({
                        variables: {
                          first: postsPerPage,
                          after: searchResultsData?.tags?.pageInfo?.endCursor,
                        },
                        updateQuery,
                      }).then(() => {
                        setIsFetchingMore(false); // Reset the flag after fetch is done
                      });
                    }
                  }}
                  className="gap-x-4	"
                >
                  {isFetchingMore ? (
                    "Loading..." // Display loading text when fetching
                  ) : (
                    <>
                      Load More{" "}
                      <svg
                        className="h-auto w-8 origin-center rotate-90"
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt"
                        height="512.000000pt"
                        viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                          fill="#000000"
                          stroke="none"
                        >
                          <path
                            d="M1387 5110 c-243 -62 -373 -329 -272 -560 27 -62 77 -114 989 -1027
l961 -963 -961 -963 c-912 -913 -962 -965 -989 -1027 -40 -91 -46 -200 -15
-289 39 -117 106 -191 220 -245 59 -28 74 -31 160 -30 74 0 108 5 155 23 58
22 106 70 1198 1160 1304 1302 1202 1185 1202 1371 0 186 102 69 -1202 1371
-1102 1101 -1140 1137 -1198 1159 -67 25 -189 34 -248 20z"
                          />
                        </g>
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

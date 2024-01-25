import styles from "./SearchInput.module.scss";

/**
 * Render the SearchInput component.
 *
 * @param {Props} props The props object.
 * @param {string} props.value The search input value
 * @param {(newValue: string) => void} props.onChange The search input onChange handler
 * @returns {React.ReactElement} The SearchInput component.
 */
export default function SearchInput({
  value,
  onChange,
  searchShown,
  setSearchShown,
  inputRef,
  ...props
}) {

  return (
    <>
      <div className={styles.wrapper}>
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          ref={inputRef}
          id="search"
          name="search"
          className={styles.input}
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          autoFocus
          type="text"
          placeholder="TYPE HERE"
          {...props}
        />
        <div className={styles.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="1em"
            viewBox="0 0 55 57"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="22.5"
              stroke="#9D9D9C"
              strokeWidth="3"
            />
            <path
              d="M51.9393 56.0607C52.5251 56.6464 53.4749 56.6464 54.0607 56.0607C54.6464 55.4749 54.6464 54.5251 54.0607 53.9393L51.9393 56.0607ZM37.9393 42.0607L51.9393 56.0607L54.0607 53.9393L40.0607 39.9393L37.9393 42.0607Z"
              fill="#9D9D9C"
            />
          </svg>
        </div>
        <button
          onClick={() => {
            setSearchShown(!searchShown);
          }}
          className={styles.closeIcon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
          >
            <path d="M2 2L44.5 44.5" stroke="#9D9D9C" strokeWidth="3" />
            <path d="M44.5 2L2 44.5" stroke="#9D9D9C" strokeWidth="3" />
          </svg>
        </button>
      </div>
    </>
  );
}

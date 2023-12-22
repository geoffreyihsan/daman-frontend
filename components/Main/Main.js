import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./Main.module.scss";

let cx = classNames.bind(styles);

export default function Main({ children, className, ...props }) {
  // Google Ad Manager Id
  const bottomMobile = "1701941651336-0";
  const bottomDesktop = "1701941453692-0";

  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(["component", className])}
      {...props}
    >
      {children}
      
    </main>
  );
}

import React from "react";
import classNames from "classnames/bind";
import styles from "./PasswordProtected.module.scss";
import { LogoOfDamanHeader } from "../../public/logos/logos";
import Link from "next/link";

let cx = classNames.bind(styles);

export default function PasswordProtected(enteredPassword, ...props) {
  console.log(enteredPassword);
  return (
    <div className={cx("component")}>
      <div className={cx("daman-logo")}>
        <Link href="/" className={cx("logo")}>
          <div className={cx("brand")}>
            <LogoOfDamanHeader />
          </div>
        </Link>
      </div>
      <h4>Fill in your password or contact our administrator.</h4>
      <div className={cx("input-wrapper")}>
        <input
          type="password"
          value={enteredPassword?.enteredPassword}
          onChange={(e) => {
            if (enteredPassword?.setEnteredPassword) {
              enteredPassword?.setEnteredPassword(e.target.value);
            }
          }}
          placeholder="Enter password"
          {...props}
        />
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

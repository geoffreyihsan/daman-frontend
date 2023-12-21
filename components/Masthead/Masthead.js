import { useEffect } from "react";

export default function Masthead(adUnitId) {
  useEffect(() => {
    if (window.googletag) {
      window.googletag.cmd.push(function () {
        window.googletag.display(`div-gpt-ad-${adUnitId}`);
      });
    }
  }, [adUnitId]);

  return <div id={`div-gpt-ad-${adUnitId}`}></div>;
}

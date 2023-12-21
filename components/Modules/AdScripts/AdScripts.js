export default function AdScripts() {
  <>
    <script
      async
      src="https://www.googletagservices.com/tag/js/gpt.js"
    ></script>
    <script>
      {`
        window.googletag = window.googletag || { cmd: [] };
        googletag.cmd.push(function() {
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP', [970, 250], 'div-gpt-ad-1701941037105-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_TOP_MOBILE', [300, 250], 'div-gpt-ad-1701941240723-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM', [970, 250], 'div-gpt-ad-1701941453692-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_MASTHEAD_BOTTOM_MOBILE', [300, 250], 'div-gpt-ad-1701941651336-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_01', [300, 600], 'div-gpt-ad-1701941862020-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_HALFPAGE_02', [300, 600], 'div-gpt-ad-1701941963018-0').addService(googletag.pubads());
            googletag.defineSlot('/6808792/DAMAN_INTERSCROLLER', [300, 600], 'div-gpt-ad-1702016546215-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
      `}
    </script>
  </>;
}

import classNames from "classnames/bind";
import styles from "./SubscribeBox.module.scss";

let cx = classNames.bind(styles);

export default function SubscribeBox() {
  return (
    <>
      <div className={cx("component")}>
        <div
          className={cx("subscribe-wrapper")}
          dangerouslySetInnerHTML={{
            __html: `
              <!-- Begin MailChimp Signup Form -->
              <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
              <div id="mc_embed_signup">
              <form action="https://daman.us3.list-manage.com/subscribe/post?u=2024fab7c4495e4decbfce629&amp;id=596eb95bb5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
              <div id="mc_embed_signup_scroll">
              <div class="mc-title-wrapper">
                <h2 class="mc-title">Subscribe</h2>
                <h5 class="mc-title">to our newsletter</h5>
              </div>
              <div class="mc-field-email">
                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email address">
              </div>
              <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
              </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2024fab7c4495e4decbfce629_596eb95bb5" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Sign up" name="subscribe" id="mc-embedded-subscribe" class="subscribe-button"></div>
                </div>
              </form>
              </div>

              <!--End mc_embed_signup-->
           `,
          }}
        ></div>
      </div>
    </>
  );
}

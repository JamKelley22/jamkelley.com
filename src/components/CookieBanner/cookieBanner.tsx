import { Button } from "antd";
import * as React from "react";

import "./cookieBanner.scss";

export interface ICookieBannerProps {
  onCookieResponse: (allowCookies: boolean) => void;
}

export function CookieBanner(props: ICookieBannerProps) {
  return (
    <div className="cookieBanner">
      <p>
        By clicking “Allow All”, you agree to the storing of cookies on your
        device to enhance site navigation and analyze site usage.
      </p>
      <div className="cookieBanner__buttons">
        <Button onClick={() => props.onCookieResponse(false)}>Deny All</Button>
        <Button onClick={() => props.onCookieResponse(true)}>Allow All</Button>
      </div>
    </div>
  );
}

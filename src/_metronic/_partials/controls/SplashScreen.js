import React from "react";
import {CircularProgress} from "@material-ui/core";
import {toAbsoluteUrl} from "../../_helpers";

export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/images/survey.png")}
          alt="Survey logo"
        />
        <CircularProgress className="splash-screen-spinner" />
      </div>
    </>
  );
}

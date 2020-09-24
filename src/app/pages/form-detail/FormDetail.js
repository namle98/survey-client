import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";


const FormAnswer = lazy(() =>
  import("./FormAnswer")
);
export default function FormDetail() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route
          path="/formanswer"
          exact
          component={FormAnswer}
        />
      </Switch>
    </Suspense>
  );
}

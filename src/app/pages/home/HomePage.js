/* eslint-disable no-lone-blocks */
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";

{
  /* =============Dashboard============= */
}
const Dashboard = lazy(() => import("../dashboard/Dashboard"));

{
  /* ==============SurveyHeader Page============= */
}
const AddEditSurveyHeader = lazy(() =>
  import("../survey-header/AddEditSurveyHeader")
);
const ListSurveyHeader = lazy(() =>
  import("../survey-header/ListSurveyHeader")
);

const DemoComponent = lazy(() => import("../demo/DemoComponent"));
{
  /* ==============SurveyHeader Page============= */
}
const AddEditOrganization = lazy(() =>
  import("../organizations/AddEditOrganization")
);
const ListOrganization = lazy(() =>
  import("../organizations/ListOrganization")
);

{
  /* ==============SurveyHeader Page============= */
}
const AddEditQuestion = lazy(() => import("../questions/AddEditQuestion"));
const ListQuestion = lazy(() => import("../questions/ListQuestion"));

{
  /* ==============SurveySection Page============= */
}
const AddSurveySection = lazy(() =>
  import("../survey-sections/AddSurveySection")
);
const EditSurveySection = lazy(() =>
  import("../survey-sections/EditSurveySection")
);
const ListSurveySection = lazy(() =>
  import("../survey-sections/ListSurveySection")
);
const DemoQuestion = lazy(() => import("../demoQuestion/DemoQuestion"));
const FormSurvey = lazy(() => import("../form/FormSurvey"));
const AddForm = lazy(() => import("../form/AddForm"));
const EditForm = lazy(() => import("../form/EditForm"));

const ShowFormSurvey = lazy(() => import("../form/ShowFormSurvey"));

const ListForm = lazy(() => import("../form/ListForm"));
// const AddForm = lazy(() => import("../form/AddForm"));
const ListAnswers = lazy(() => import("../answers/ListAnswers"));

{
  /* =============Error Page============= */
}
const Error403 = lazy(() => import("../common/Error403"));
{
  /* ==================================== */
}

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }

        {/* Route survey-header */}
        <Route
          path="/survey-header/add"
          exact
          component={AddEditSurveyHeader}
        />
        <Route
          path="/survey-header/update/:id"
          component={AddEditSurveyHeader}
        />
        <Route path="/survey-header/list" component={ListSurveyHeader} />

        {/* Route organizations */}
        <Route
          path="/organizations/add"
          exact
          component={AddEditOrganization}
        />
        <Route
          path="/organizations/update/:id"
          component={AddEditOrganization}
        />
        <Route path="/organizations/list" component={ListOrganization} />

        {/* Route questions */}
        <Route path="/questions/add" exact component={AddEditQuestion} />
        <Route path="/questions/update/:id" component={AddEditQuestion} />
        <Route path="/questions/list" component={ListQuestion} />

        {/* Route questions */}
        <Route path="/survey-sections/add" exact component={AddSurveySection} />
        <Route
          path="/survey-sections/update/:id"
          component={EditSurveySection}
        />
        <Route path="/survey-sections/list" component={ListSurveySection} />

        {/* Route other */}
        <Route path="/dashboard" component={Dashboard} />

        {/* Route other */}
        <Route path="/demo" component={DemoComponent} />
        <Route path="/demoQuestion" component={DemoQuestion} />
        <Route path="/formSurvey" component={FormSurvey} />
        <Route path="/form/add" component={AddForm} />
        <Route path="/showForm" component={ShowFormSurvey} />
        <Route path="/form/list" component={ListForm} />
        <Route path="/form/edit/:id" component={EditForm} />
        <Route path="/answers" component={ListAnswers} />

        {/* <Redirect to="Error403" /> */}
        <Route path="/Error403" component={Error403} />
      </Switch>
    </Suspense>
  );
}

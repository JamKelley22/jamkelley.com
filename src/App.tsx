import { Switch as ANTSwitch } from "antd";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
//import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import {
  APIHandler,
  FakeAPIHandler,
  LocalAPIHandler,
  IAPIHandler,
} from "api/handler";
import { ALL_ROUTES, CustomRoute } from "./routes";
import { APIContext } from "context/apiContext";
import Nav from "./components/Nav/nav";

import "./App.scss";
import { CookieBanner } from "components/CookieBanner/cookieBanner";
import { CookieContext } from "context/cookieContext";

library.add(fab, faLink);

const isProduction = process.env.NODE_ENV === "production";

const App: React.FC = (props: any) => {
  const [useLocalAPI, setUseLocalAPI] = useState(true);
  const [allowCookies, setAllowCookies] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(true);

  const handler: IAPIHandler = isProduction
    ? new APIHandler()
    : useLocalAPI
    ? new LocalAPIHandler()
    : new FakeAPIHandler();

  return (
    <CookieContext.Provider value={allowCookies}>
      <APIContext.Provider value={handler}>
        <div className="App">
          {!isProduction && (
            <div className="non-prod-use-local-api-switch">
              <span>Use Local API</span>
              <ANTSwitch
                defaultChecked
                onChange={(checked: boolean) => setUseLocalAPI(checked)}
              />
            </div>
          )}

          <div id="navagationLinksContainer">
            <Nav />
            {/*props.location.pathname !== HOME.route ? Nav : null*/}
          </div>
          <div id="page">
            <Switch>
              {ALL_ROUTES.map((route: CustomRoute, i: number) => (
                <Route key={i} exact path={route.route}>
                  {route.page}
                </Route>
              ))}
            </Switch>
          </div>

          {cookieBannerVisible && (
            <CookieBanner
              onCookieResponse={(allowCookies: boolean) => {
                setAllowCookies(allowCookies);
                setCookieBannerVisible(false);
              }}
            />
          )}
        </div>
      </APIContext.Provider>
    </CookieContext.Provider>
  );
};

export default withRouter((props) => <App {...props} />);

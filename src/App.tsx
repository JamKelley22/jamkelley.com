import { Switch as ANTSwitch } from "antd";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { CloseCircleTwoTone } from "@ant-design/icons";
//import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import {
  APIHandler,
  FakeAPIHandler,
  LocalAPIHandler,
  IAPIHandler,
} from "api/handler";
import { ALL_ROUTES, CustomRoute } from "./routes";
import { APIContext } from "context/apiContext";
import Nav from "./Nav";

import "./App.scss";

library.add(fab);

const isProduction = process.env.NODE_ENV === "production";

const App: React.FC = (props: any) => {
  const [blmOverlayVisible, setBlmOverlayVisible] = useState(true);
  const [useLocalAPI, setUseLocalAPI] = useState(true);

  const handler: IAPIHandler = isProduction
    ? new APIHandler()
    : useLocalAPI
    ? new LocalAPIHandler()
    : new FakeAPIHandler();

  return (
    <APIContext.Provider value={handler}>
      <div className="App">
        {blmOverlayVisible && (
          <div
            id="blm-overlay"
            style={{ visibility: isProduction ? "inherit" : "hidden" }}
          >
            <div id="blm-widget">
              <CloseCircleTwoTone
                id="campaign-zero-widget--closebutton"
                style={{
                  fontSize: "24px",
                  transform: "translate(-5px, 30px)",
                  zIndex: 101,
                }}
                twoToneColor="#eb2f96"
                onClick={() => setBlmOverlayVisible(false)}
              />
              <div id="campaign-zero-widget" />
            </div>
          </div>
        )}

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
      </div>
    </APIContext.Provider>
  );
};

export default withRouter((props) => <App {...props} />);

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { CloseCircleTwoTone } from "@ant-design/icons";
//import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import { ALL_ROUTES, CustomRoute } from "./routes";
import Nav from "./Nav";

import "./App.scss";

library.add(fab);

const App: React.FC = (props: any) => {
  const [blmOverlayVisible, setBlmOverlayVisible] = useState(true);
  return (
    <div className="App">
      {blmOverlayVisible && (
        <div id="blm-overlay">
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
  );
};

export default withRouter((props) => <App {...props} />);

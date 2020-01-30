import React from "react";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
//import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import { ALL_ROUTES, CustomRoute, HOME } from "./routes";
import Nav from "./Nav";

import "./App.scss";

library.add(fab);

const App: React.FC = (props: any) => {
  return (
    <div className="App">
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

export default withRouter(props => <App {...props} />);

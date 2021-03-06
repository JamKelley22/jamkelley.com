import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { CustomRoute, NAVAGATION } from "../../routes";
import { APIContext } from "context/apiContext";
import { IAPIHandler } from "api/handler";

import "./nav.scss";

export interface INavProps {
  seperator?: string;
}

class Nav extends React.Component<INavProps & RouteComponentProps> {
  static contextType = APIContext;
  render() {
    const handler: IAPIHandler = this.context;
    return (
      <div id="navagationLinks">
        {NAVAGATION.map((route: CustomRoute, i: number) => {
          const seperator = i === 0 ? "" : this.props.seperator || "";
          return /^https?:\/\//.test(route.route) ? (
            <a
              key={i}
              href={route.route}
              onClick={() => route.onClick(handler)}
            >
              {seperator} {route.name}
            </a>
          ) : (
            <Link
              key={i}
              to={route.route}
              onClick={() => route.onClick(handler)}
              id={
                route.route === this.props.location.pathname
                  ? "currentRoute"
                  : ""
              } //use activeClassName or activeStyle https://knowbody.github.io/react-router-docs/api/Link.html
            >
              {seperator} {route.name}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default withRouter((props) => <Nav {...props} />);

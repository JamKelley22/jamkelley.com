import * as React from "react";
import { APIContext } from "context/apiContext";
import { IAPIHandler } from "api/handler";
import { Accolade } from "api/types";
import { AccoladesPresentational } from "./accoladesPresentational";

export interface IAccoladesProps {}

interface IAccoladesState {
  accolades: Accolade[];
  loading: boolean;
}

export default class Accolades extends React.Component<
  IAccoladesProps,
  IAccoladesState
> {
  static contextType = APIContext;

  state = {
    accolades: [],
    loading: true,
  };

  componentDidMount() {
    this.getAccolades();
  }

  getAccolades = async () => {
    const handler: IAPIHandler = this.context;
    const accolades: Accolade[] = await handler.getAccolades();
    this.setState({
      accolades: accolades,
      loading: false,
    });
  };

  public render() {
    const { accolades } = this.state;
    return <AccoladesPresentational accolades={accolades} />;
  }
}

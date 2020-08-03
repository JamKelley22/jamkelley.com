import * as React from "react";
import { Spin } from "antd";
import { APIContext } from "context/apiContext";
import { IAPIHandler } from "api/handler";
import { WritingPresentational } from "./writingsPresentational";
import { Writing } from "api/types";

export interface IWritingsProps {}
export interface IWritingsState {
  writings: Writing[];
  loading: boolean;
}

export default class Writings extends React.Component<
  IWritingsProps,
  IWritingsState
> {
  static contextType = APIContext;

  state: IWritingsState = {
    writings: [],
    loading: true,
  };

  componentDidMount() {
    this.getWritings();
  }

  getWritings = async () => {
    const handler: IAPIHandler = this.context;
    const writings: Writing[] = await handler.getWritings();
    this.setState({
      writings: writings,
      loading: false,
    });
  };

  public render() {
    const { writings, loading } = this.state;
    if (loading) return <Spin />;
    return <WritingPresentational writings={writings} />;
  }
}

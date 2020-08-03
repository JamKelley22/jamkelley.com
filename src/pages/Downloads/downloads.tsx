import * as React from "react";

import { DownloadsPresentational } from "./downloadsPresentational";
import { APIContext } from "context/apiContext";
import { IAPIHandler } from "api/handler";
import { Download } from "api/types";

export interface IDownloadsProps {}
export interface IDownloadsState {
  downloads: Download[];
  loading: boolean;
}

export default class Downloads extends React.Component<
  IDownloadsProps,
  IDownloadsState
> {
  static contextType = APIContext;

  state: IDownloadsState = {
    downloads: [],
    loading: true,
  };

  componentDidMount() {
    this.getDownloads();
  }

  getDownloads = async () => {
    const handler: IAPIHandler = this.context;
    const downloads: Download[] = await handler.getDownloads();
    this.setState({
      downloads: downloads,
      loading: false,
    });
  };

  public render() {
    const { loading, downloads } = this.state;
    return <DownloadsPresentational loading={loading} downloads={downloads} />;
  }
}

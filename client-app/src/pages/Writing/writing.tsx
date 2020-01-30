import * as React from "react";
import axios from "axios";
import { Spin } from "antd";

export interface IWritingProps {}
export interface IWritingState {
  writingFilenames: string[];
}

export default class Writing extends React.Component<
  IWritingProps,
  IWritingState
> {
  state: IWritingState = {
    writingFilenames: []
  };
  componentDidMount() {
    axios.get("http://jamkelley.com:8080/writing/").then(response => {
      this.setState({
        writingFilenames: response.data
      });
    });
  }
  public render() {
    if (this.state.writingFilenames.length === 0) return <Spin />;
    return (
      <div>
        <h3>Writing Samples</h3>
        <p>
          Below is a list of some of my previous writing samples. This list
          includes both research documents and essays.{" "}
        </p>
        <ul>
          {this.state.writingFilenames.map(
            (filename: string, index: number) => (
              <li key={index}>
                <a href={`http://jamkelley.com:8080/writing/${filename}`}>
                  {filename
                    .split(".")[0]
                    .split(/(?=[A-Z][^A-Z])/)
                    .join(" ")}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

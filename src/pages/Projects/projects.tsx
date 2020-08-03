import * as React from "react";
import { APIContext } from "context/apiContext";
import { ProjectsPresentational } from "./projectsPresentational";
import { Project } from "api/types";
import { IAPIHandler } from "api/handler";
import { Spin } from "antd";

export interface IProjectsProps {}

interface IProjectsState {
  projects: Project[];
  loading: boolean;
}

export default class Projects extends React.Component<
  IProjectsProps,
  IProjectsState
> {
  static contextType = APIContext;

  state: IProjectsState = {
    projects: [],
    loading: true,
  };

  componentDidMount = () => {
    this.getProjects();
  };

  getProjects = async () => {
    const handler: IAPIHandler = this.context;
    const projects: Project[] = await handler.getProjects();
    this.setState({
      projects: projects,
      loading: false,
    });
  };

  public render() {
    const { projects, loading } = this.state;
    if (loading) return <Spin />;
    return <ProjectsPresentational projects={projects} />;
  }
}

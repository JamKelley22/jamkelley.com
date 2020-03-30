import React from "react";
import axios from "axios";

import {
  Home,
  Error404,
  Projects,
  Accolades,
  Writing,
  Downloads,
  Speaking
} from "./pages";
import { message } from "antd";

class CustomRoute {
  name: string;
  route: string;
  page: React.ReactNode;
  onClick: () => void;
  constructor(data: any) {
    this.name = data.name;
    this.route = data.route;
    this.page = data.page;
    this.onClick = data.onClick;
  }
}

const getResumeRoute = async (): Promise<string> => {
  try {
    const response = await axios.get(
      "http://jamkelley.com/api/resume/pdf/status"
    );
  } catch (e) {
    console.log(e.response);

    if (e.response.data.error) {
      message.error(e.response.data.message);
    }
    throw e;
  }
  return "http://jamkelley.com/api/resume/pdf";
};

export const HOME: CustomRoute = new CustomRoute({
  name: "Home",
  page: Home,
  route: "/",
  onClick: () => {}
});
const Blog: CustomRoute = new CustomRoute({
  name: "Blog",
  page: Error404,
  route: "/blog",
  onClick: () => {}
});
const PROJECTS: CustomRoute = new CustomRoute({
  name: "Projects",
  page: Projects,
  route: "/projects",
  onClick: () => {}
});
const Contact: CustomRoute = new CustomRoute({
  name: "Contact",
  page: Error404,
  route: "/contact",
  onClick: () => {}
});
const Settings: CustomRoute = new CustomRoute({
  name: "Settings",
  page: Error404,
  route: "/settings",
  onClick: () => {}
});
const Resume: CustomRoute = new CustomRoute({
  name: "Resume",
  page: () => {},
  route: "#", //getResumeRoute()
  onClick: async () => {
    try {
      const resumeRoute = await getResumeRoute();
      window.open(resumeRoute);
    } catch (e) {}
  }
});
const Archive: CustomRoute = new CustomRoute({
  name: "Archive",
  page: () => {},
  route: "https://archive.jamkelley.com",
  onClick: () => {}
});
const ACCOLADES: CustomRoute = new CustomRoute({
  name: "Accolades",
  page: Accolades,
  route: "/accolades",
  onClick: () => {}
});
const WRITNG: CustomRoute = new CustomRoute({
  name: "Writing",
  page: () => <Writing />,
  route: "/writing",
  onClick: () => {}
});
const SPEAKING: CustomRoute = new CustomRoute({
  name: "Speaking",
  page: () => <Speaking />, //Todo
  route: "/speaking",
  onClick: () => {}
});
const DOWNLOADS: CustomRoute = new CustomRoute({
  name: "Downloads",
  page: () => <Downloads />,
  route: "/downloads",
  onClick: () => {}
});

const ALL_ROUTES: CustomRoute[] = [
  HOME,
  Blog,
  PROJECTS,
  Contact,
  DOWNLOADS,
  Archive,
  Settings,
  ACCOLADES,
  WRITNG,
  SPEAKING
];

const NAVAGATION: CustomRoute[] = [
  HOME,
  Resume,
  //Blog,
  PROJECTS,
  //Contact
  DOWNLOADS,
  ACCOLADES,
  Archive,
  WRITNG,
  SPEAKING
  //Settings
];

export { ALL_ROUTES, NAVAGATION, CustomRoute };

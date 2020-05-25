import React from "react";
import axios from "axios";
import { message } from "antd";

import {
  Home,
  Error404,
  Projects,
  Accolades,
  Writing,
  Downloads,
  Speaking,
  Creative,
} from "./pages";

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
    //Todo: move this to the handler
    const response = await axios.get(
      "https://jamkelley.com/api/resume/pdf/status"
    );
    if (response.data.error) {
      throw response.data;
    }
  } catch (e) {
    if (e.response.data.error) {
      message.error(e.response.data.message);
    }
    throw e;
  }
  return "https://jamkelley.com/api/resume/pdf";
};

export const HOME: CustomRoute = new CustomRoute({
  name: "Home",
  page: Home,
  route: "/",
  onClick: () => {},
});
const BLOG: CustomRoute = new CustomRoute({
  name: "Blog",
  page: Error404,
  route: "/blog",
  onClick: () => {},
});
const PROJECTS: CustomRoute = new CustomRoute({
  name: "Projects",
  page: Projects,
  route: "/projects",
  onClick: () => {},
});
const CONTACT: CustomRoute = new CustomRoute({
  name: "Contact",
  page: Error404,
  route: "/contact",
  onClick: () => {},
});
const SETTINGS: CustomRoute = new CustomRoute({
  name: "Settings",
  page: Error404,
  route: "/settings",
  onClick: () => {},
});
const RESUME: CustomRoute = new CustomRoute({
  name: "Resume",
  page: () => {},
  route: "#",
  onClick: async () => {
    try {
      const resumeRoute = await getResumeRoute();
      window.open(resumeRoute);
    } catch (e) {}
  },
});
const ARCHIVE: CustomRoute = new CustomRoute({
  name: "Archive",
  page: () => {},
  route: "https://archive.jamkelley.com",
  onClick: () => {},
});
const ACCOLADES: CustomRoute = new CustomRoute({
  name: "Accolades",
  page: Accolades,
  route: "/accolades",
  onClick: () => {},
});
const WRITNG: CustomRoute = new CustomRoute({
  name: "Writing",
  page: () => <Writing />,
  route: "/writing",
  onClick: () => {},
});
const SPEAKING: CustomRoute = new CustomRoute({
  name: "Speaking",
  page: () => <Speaking />, //Todo
  route: "/speaking",
  onClick: () => {},
});
const DOWNLOADS: CustomRoute = new CustomRoute({
  name: "Downloads",
  page: () => <Downloads />,
  route: "/downloads",
  onClick: () => {},
});
const CREATIVE: CustomRoute = new CustomRoute({
  name: "Creative",
  page: () => <Creative />,
  route: "/creative",
  onClick: () => {},
});

const ALL_ROUTES: CustomRoute[] = [
  HOME,
  BLOG,
  PROJECTS,
  CONTACT,
  DOWNLOADS,
  ARCHIVE,
  SETTINGS,
  ACCOLADES,
  WRITNG,
  SPEAKING,
  CREATIVE,
];

const NAVAGATION: CustomRoute[] = [
  HOME,
  RESUME,
  BLOG,
  PROJECTS,
  CONTACT,
  DOWNLOADS,
  ACCOLADES,
  ARCHIVE,
  WRITNG,
  SPEAKING,
  CREATIVE,
  //Settings
];

export { ALL_ROUTES, NAVAGATION, CustomRoute };

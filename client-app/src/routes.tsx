import React from "react";
import { Home, Error404, Projects, Accolades, Writing } from "./pages";

class CustomRoute {
  name: string;
  route: string;
  page: React.ReactNode;
  constructor(data: any) {
    this.name = data.name;
    this.route = data.route;
    this.page = data.page;
  }
}
export const HOME: CustomRoute = new CustomRoute({
  name: "Home",
  page: Home,
  route: "/"
});
const Blog: CustomRoute = new CustomRoute({
  name: "Blog",
  page: Error404,
  route: "/blog"
});
const PROJECTS: CustomRoute = new CustomRoute({
  name: "Projects",
  page: Projects,
  route: "/projects"
});
const Contact: CustomRoute = new CustomRoute({
  name: "Contact",
  page: Error404,
  route: "/contact"
});
const Downloads: CustomRoute = new CustomRoute({
  name: "Downloads",
  page: Error404,
  route: "/downloads"
});
const Settings: CustomRoute = new CustomRoute({
  name: "Settings",
  page: Error404,
  route: "/settings"
});
const Resume: CustomRoute = new CustomRoute({
  name: "Resume",
  page: () => {},
  route: "http://jamkelley.com:8080/resume/pdf"
});
const Archive: CustomRoute = new CustomRoute({
  name: "Archive",
  page: () => {},
  route: "https://archive.jamkelley.com"
});
const ACCOLADES: CustomRoute = new CustomRoute({
  name: "Accolades",
  page: Accolades,
  route: "/accolades"
});
const WRITNG: CustomRoute = new CustomRoute({
  name: "Writing",
  page: () => <Writing />,
  route: "/writing"
});

const ALL_ROUTES: CustomRoute[] = [
  HOME,
  Blog,
  PROJECTS,
  Contact,
  Downloads,
  Archive,
  Settings,
  ACCOLADES,
  WRITNG
];

const NAVAGATION: CustomRoute[] = [
  HOME,
  Resume,
  //Blog,
  PROJECTS,
  //Contact
  //Downloads,
  ACCOLADES,
  Archive,
  WRITNG
  //Settings
];

export { ALL_ROUTES, NAVAGATION, CustomRoute };

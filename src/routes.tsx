import React from "react";

import {
  Home,
  Error404,
  Projects,
  Accolades,
  Writings,
  Downloads,
  Speaking,
  Creative,
  Contact,
} from "./pages";
import { ArchiveURL } from "./constants";
import { IAPIHandler } from "api/handler";
import { CustomRoute } from "types";

export const HOME: CustomRoute = new CustomRoute({
  name: "Home",
  page: () => <Home />,
  route: "/",
  onClick: (handler: IAPIHandler) => {},
});
const BLOG: CustomRoute = new CustomRoute({
  name: "Blog",
  page: () => <Error404 />,
  route: "/blog",
  onClick: (handler: IAPIHandler) => {},
});
const PROJECTS: CustomRoute = new CustomRoute({
  name: "Projects",
  page: () => <Projects />,
  route: "/projects",
  onClick: (handler: IAPIHandler) => {},
});
const CONTACT: CustomRoute = new CustomRoute({
  name: "Contact",
  page: () => <Contact />,
  route: "/contact",
  onClick: (handler: IAPIHandler) => {},
});
const SETTINGS: CustomRoute = new CustomRoute({
  name: "Settings",
  page: () => <Error404 />,
  route: "/settings",
  onClick: (handler: IAPIHandler) => {},
});
const RESUME: CustomRoute = new CustomRoute({
  name: "Resume",
  page: () => {},
  route: "#",
  onClick: async (handler: IAPIHandler) => {
    try {
      const resumeRoute = await handler.getResumeRoute();
      window.open(resumeRoute);
    } catch (e) {
      console.error(e);
    }
  },
});
const ARCHIVE: CustomRoute = new CustomRoute({
  name: "Archive",
  page: () => {},
  route: ArchiveURL,
  onClick: (handler: IAPIHandler) => {},
});
const ACCOLADES: CustomRoute = new CustomRoute({
  name: "Accolades",
  page: () => <Accolades />,
  route: "/accolades",
  onClick: (handler: IAPIHandler) => {},
});
const WRITNG: CustomRoute = new CustomRoute({
  name: "Writing",
  page: () => <Writings />,
  route: "/writing",
  onClick: (handler: IAPIHandler) => {},
});
const SPEAKING: CustomRoute = new CustomRoute({
  name: "Speaking",
  page: () => <Speaking />, //Todo
  route: "/speaking",
  onClick: (handler: IAPIHandler) => {},
});
const DOWNLOADS: CustomRoute = new CustomRoute({
  name: "Downloads",
  page: () => <Downloads />,
  route: "/downloads",
  onClick: (handler: IAPIHandler) => {},
});
const CREATIVE: CustomRoute = new CustomRoute({
  name: "Creative",
  page: () => <Creative />,
  route: "/creative",
  onClick: (handler: IAPIHandler) => {},
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
  //BLOG,
  PROJECTS,
  //CONTACT,
  DOWNLOADS,
  ACCOLADES,
  //ARCHIVE,
  WRITNG,
  //SPEAKING,
  //CREATIVE,
  //Settings
];

export { ALL_ROUTES, NAVAGATION, CustomRoute };

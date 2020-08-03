import React from "react";
import { FakeAPIHandler, IAPIHandler } from "api/handler";

export const APIContext = React.createContext<IAPIHandler>(
  new FakeAPIHandler()
);

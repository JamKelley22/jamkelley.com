import { IAPIHandler } from "api/handler";

export class CustomRoute {
  name: string;
  route: string;
  page: React.ReactNode;
  onClick: (handler: IAPIHandler) => void;
  constructor(data: any) {
    this.name = data.name;
    this.route = data.route;
    this.page = data.page;
    this.onClick = data.onClick;
  }
}

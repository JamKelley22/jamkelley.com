import moment from "moment";

interface IPageData {
  items: PageItem[];
}

export class PageData implements IPageData {
  items: PageItem[];
  constructor(data: any) {
    this.items = data.items.map();
  }
}

class PageItem {
  title: string;
  detail?: string;
  description: string;
  url: string;
  fallbackURL?: string;
  startDate: moment.Moment;
  endDate?: moment.Moment;
  location?: string;

  constructor(data: any) {
    this.title = data.title;
    this.detail = data.detail;
    this.description = data.description;
    this.url = data.url;
    this.fallbackURL = data.fallbackURL;
    this.startDate = moment(data.isoStartDate);
    this.endDate = moment(data.endDate);
    this.location = data.location;
  }
}

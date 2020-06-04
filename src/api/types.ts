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

//=======Twine=======
export class Passage {
  text: string;
  all: string;
  name: string;
  pid: number;
  tags: string[];
  responses: PassageResponse[];
  constructor(data: any) {
    const textContent: string[] = data["#text"]
      .split(/\r?\n/)
      .filter((content: string) => content)
      .map((content: string) => content.trim());
    const hasText: boolean = textContent[0].substring(0, 1) !== "[";
    this.text = hasText
      ? textContent
          .filter((text: string) => text.substring(0, 1) !== "[")
          .join("\n")
      : "";
    this.all = data["#text"];
    this.name = data["@attributes"].name;
    this.pid = data["@attributes"].pid;
    this.tags = data["@attributes"].tags.split(" ");
    this.responses = textContent
      .filter((text: string) => text.substring(0, 1) === "[")
      .map((responseString: string) => new PassageResponse(responseString));
  }
}

export class PassageResponse {
  text: string;
  nextPassageName: string;
  constructor(data: string) {
    const content: string[] = data.substring(2, data.length - 2).split("->");
    this.text = content[0];
    this.nextPassageName = content[1];
  }
}

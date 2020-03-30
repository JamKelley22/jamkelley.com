import * as React from "react";
//import * as moment from "moment";

class SpeakingItem {
  name: string;
  url: string;
  //date: moment.Moment;
  constructor(data: any) {
    this.name = data.name;
    this.url = data.url;
    //this.date = moment(data.date);
  }
}

interface ISpeakingProps {
  items?: SpeakingItem[];
}

const defaultProps: ISpeakingProps = {
  items: [
    new SpeakingItem({
      name: "Test",
      url: "google.com"
    })
  ]
};

const Speaking: React.FunctionComponent<ISpeakingProps> = (
  props: ISpeakingProps
) => {
  return (
    <div>
      <ul>
        {props.items &&
          props.items.map((item: SpeakingItem, i: number) => (
            <li key={i}>
              <a href={item.url}>
                {item.name}
                {/*moment(item.date).format("MMMM Do YYYY")*/}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

Speaking.defaultProps = defaultProps;

export default Speaking;

import * as React from "react";
import axios from "axios";
import { List, Avatar, Icon, Tag } from "antd";

export interface IDownloadsProps {}
export interface IDownloadsState {
  downloads: Download[];
  loading: boolean;
}

class Download {
  name: string;
  description: string;
  link: string;
  download_link: string;
  image: string;
  os: string[];

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.link = data.link;
    this.download_link = data.download_link;
    this.image = data.image;
    this.os = data.os;
  }
}

const colors: string[] = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
];

export default class Downloads extends React.Component<
  IDownloadsProps,
  IDownloadsState
> {
  state: IDownloadsState = {
    downloads: [],
    loading: true
  };

  componentDidMount() {
    axios.get("https://jamkelley.com/api/downloads").then(response => {
      this.setState({
        downloads: response.data.downloads.map(
          (data: any) => new Download(data)
        ),
        loading: false
      });
    });
  }

  stringToHash = (val: string) => {
    var hash = 0;

    if (val.length === 0) return hash;

    for (let i = 0; i < val.length; i++) {
      let char = val.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return hash;
  };

  stringToColor = (val: string): string => {
    let index = this.stringToHash(val) % colors.length;
    return colors[index];
  };

  public render() {
    const IconText = ({ type, text, onClick }: any) => (
      <span>
        <Icon onClick={onClick} type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3>Downloads</h3>
        <List
          style={{ width: "75%" }}
          itemLayout="vertical"
          size="small"
          bordered={true}
          loading={this.state.loading}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={this.state.downloads.map(
            (download: Download, i: number) => {
              return {
                href: download.link,
                download_link: download.download_link,
                title: `${i}: ${download.name}`,
                avatar: download.image,
                description: download.description,
                content: (
                  <div>
                    <strong>os: </strong>
                    {download.os.map((os_tag: string, i: number) => (
                      <Tag key={i} color={this.stringToColor(os_tag)}>
                        {os_tag}
                      </Tag>
                    ))}
                  </div>
                )
              };
            }
          )}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  onClick={() => (window.location.href = item.download_link)}
                  type="download"
                  text="0"
                  key="list-vertical-star-o"
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

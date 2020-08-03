import * as React from "react";
import { List, Avatar, Tag, Icon } from "antd";
import { Download } from "api/types";
import { stringToColor } from "../../util/util";

export interface IDownloadsPresentationalProps {
  loading: boolean;
  downloads: Download[];
}

export function DownloadsPresentational(props: IDownloadsPresentationalProps) {
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
        alignItems: "center",
      }}
    >
      <h3>Downloads</h3>
      <List
        style={{ width: "75%" }}
        itemLayout="vertical"
        size="small"
        bordered={true}
        loading={props.loading}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.downloads.map((download: Download, i: number) => {
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
                  <Tag key={i} color={stringToColor(os_tag)}>
                    {os_tag}
                  </Tag>
                ))}
              </div>
            ),
          };
        })}
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                onClick={() => (window.location.href = item.download_link)}
                type="download"
                text="0"
                key="list-vertical-star-o"
              />,
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

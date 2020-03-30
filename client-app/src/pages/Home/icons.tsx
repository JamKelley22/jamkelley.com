import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MakeIcon = (href: string, icon: IconProp, key: number) => (
  <a href={href} key={key}>
    <FontAwesomeIcon icon={icon} />
  </a>
);

class Icon {
  href: string;
  icon: IconProp;

  constructor(data: any) {
    this.href = data.href;
    this.icon = data.icon;
  }
}

const Icons: Icon[] = [
  {
    href: "https://github.com/JamKelley22/",
    icon: ["fab", "github"]
  },
  {
    href: "https://www.youtube.com/channel/UCS-n7QNji8ZBA6SctaKFr5A",
    icon: ["fab", "youtube"]
  },
  {
    href: "https://dev.to/jamkelley22",
    icon: ["fab", "dev"]
  },
  {
    href: "https://twitter.com/JameelKelley",
    icon: ["fab", "twitter"]
  },
  {
    href: "https://www.instagram.com/jamkelley22",
    icon: ["fab", "instagram"]
  },
  {
    href: "https://www.linkedin.com/in/jamkelley22/",
    icon: ["fab", "linkedin"]
  },
  {
    href: "https://stackoverflow.com/users/7732931/jameel-kelley",
    icon: ["fab", "stack-overflow"]
  }
];

export { MakeIcon, Icons, Icon };

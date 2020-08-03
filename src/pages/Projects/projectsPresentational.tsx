import { Card } from "antd";
import * as React from "react";

import { Project, ProjectLink } from "api/types";

import "./projects.scss";
// import { stringToColor } from "../../util/util";

export interface IProjectsPresentationalProps {
  projects: Project[];
}

export function ProjectsPresentational(props: IProjectsPresentationalProps) {
  return (
    <div className="projectCards">
      {props.projects.map((project: Project, i: number) => {
        // const colorHex = stringToColor(project.name, true);

        return (
          <Card
            title={project.name}
            extra={project.href && <a href={project.href}>Link</a>}
            className="projectCard"
            key={i}
            // style={{ backgroundColor: `#${colorHex}` }}
          >
            <ul>
              {project.video && (
                <li>
                  <a href={project.video}>Video</a>
                </li>
              )}
              {project.github && (
                <li>
                  <a href={project.github}>GitHub</a>
                </li>
              )}
              {project.links.length > 0 && (
                <div>
                  <li>Links</li>
                  <ul>
                    {project.links.map((link: ProjectLink, i: number) => (
                      <li key={i}>
                        <a href={link.link}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}

import * as React from "react";
import { Writing } from "api/types";

export interface IWritingPresentationalProps {
  writings: Writing[];
}

export function WritingPresentational(props: IWritingPresentationalProps) {
  return (
    <div>
      <h3>Writing Samples</h3>
      <p>
        Below is a list of some of my previous writing samples. This list
        includes both research documents and essays.{" "}
      </p>
      <ul>
        {props.writings.map((writing: Writing, index: number) => (
          <li key={index}>
            <a href={`https://jamkelley.com/api/writing/${writing.name}`}>
              {writing.name
                .split(".")[0]
                .split(/(?=[A-Z][^A-Z])/)
                .join(" ")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

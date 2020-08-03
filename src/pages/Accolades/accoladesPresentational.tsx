import * as React from "react";
import { Accolade } from "api/types";

export interface IAccoladesPresentationalProps {
  accolades: Accolade[];
}

export function AccoladesPresentational(props: IAccoladesPresentationalProps) {
  return (
    <div>
      <ul>
        {props.accolades.map((accolade: Accolade, i: number) => (
          <li key={i}>
            <a href={accolade.url}>{accolade.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

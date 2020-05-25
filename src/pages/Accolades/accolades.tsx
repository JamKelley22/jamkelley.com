import * as React from "react";

interface IAccoladesProps {}

const Accolades: React.FunctionComponent<IAccoladesProps> = props => {
  return (
    <div>
      <ul>
        <li>
          <a href="https://software.intel.com/en-us/ultimate-coder-vr/team4">
            Intel Ultimate Coder Challenge Winner
          </a>
        </li>
        <li>
          <a href="http://www.vrac.iastate.edu/hci/reu/reu2017/">REU</a>
        </li>
      </ul>
    </div>
  );
};

export default Accolades;

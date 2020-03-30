import React from "react";

import { Icons, MakeIcon, Icon } from "./icons";
import { Chatbot } from "../../components";

import Ebet from "../../images/ebet.png";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <img src={Ebet} id="ebet" alt="Elephant Logo" />
      <h1>Jameel Kelley</h1>
      <div id="icons">
        {Icons.map((icon: Icon, i: number) =>
          MakeIcon(icon.href, icon.icon, i)
        )}
      </div>
      <br />
      <hr style={{ width: "80%" }} />
      <br />
      <Chatbot />
    </div>
  );
};

export default Home;

/*
<div id="info">
        <div id="left">
          <h1>Jameel Kelley</h1>
          <h3>Software Engineer @ ISU</h3>
          <Button>Hire Me</Button>
        </div>

        <img src={Ebet} id="ebet" />
      </div>

      
*/

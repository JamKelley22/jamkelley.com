import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Nav from "../../Nav";
import { Chatbot } from "../../components";

import Ebet from "../../images/ebet.png";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div className="Home">
      <img src={Ebet} id="ebet" />
      <h1>Jameel Kelley</h1>
      <div id="icons">
        <a href="https://github.com/JamKelley22/">
          <FontAwesomeIcon icon={["fab", "github"]} />
        </a>
        <a href="https://www.youtube.com/channel/UCS-n7QNji8ZBA6SctaKFr5A">
          <FontAwesomeIcon icon={["fab", "youtube"]} />
        </a>
        <a href="https://dev.to/jamkelley22">
          <FontAwesomeIcon icon={["fab", "dev"]} />
        </a>
        <a href="https://twitter.com/JameelKelley">
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a href="https://www.facebook.com/JamKelley22">
          <FontAwesomeIcon icon={["fab", "facebook"]} />
        </a>
        <a href="https://www.instagram.com/jamkelley22">
          <FontAwesomeIcon icon={["fab", "instagram"]} />
        </a>
        <a href="https://www.linkedin.com/in/jamkelley22/">
          <FontAwesomeIcon icon={["fab", "linkedin"]} />
        </a>
        <a href="https://stackoverflow.com/users/7732931/jameel-kelley">
          <FontAwesomeIcon icon={["fab", "stack-overflow"]} />
        </a>
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

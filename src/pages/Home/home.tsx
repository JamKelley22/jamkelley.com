import React from "react";

import { Icons, MakeIcon, Icon } from "./icons";
import { Chatbot } from "../../components";

import Ebet from "../../images/ebet.png";
import "./home.scss";
import { Spin } from "antd";
import {
  IChatbotPresentationalProps,
  ChatbotPresentational,
} from "components/Chatbot/chatbotPresentational";

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
      <Chatbot
        dataFileName={"chatbot_jamkelley.com"}
        loadingElement={<Spin />}
        render={(props: IChatbotPresentationalProps) => (
          <ChatbotPresentational {...props} />
        )}
      />
    </div>
  );
};

export default Home;

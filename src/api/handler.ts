import axios from "axios";

import { ChatbotDialogue } from "components/Chatbot/types";

import ChatbotData from "data/chatbotData.json";

import { chatbotXMLToJSON } from "./util";

const BASE_URL = "https://jamkelley.com/api";
const DEV_BASE_URL = "http://localhost:5000";

export interface IAPIHandler {
  getChatbotDialogue(): Promise<ChatbotDialogue>;
  getChatbotDialogueFromTwine(dataFileName: string): Promise<ChatbotDialogue>;
}

export class APIHandler implements IAPIHandler {
  getChatbotDialogue = async (): Promise<ChatbotDialogue> => {
    const url = `${BASE_URL}/chatbot/json`;
    try {
      const response = await axios.get(url);
      return new ChatbotDialogue(response.data);
    } catch (e) {
      //Todo: handle it here
      throw e;
    }
  };

  getChatbotDialogueFromTwine = async (
    dataFileName: string
  ): Promise<ChatbotDialogue> => {
    const url: string = `${BASE_URL}/chatbot/${dataFileName}.html`;
    const ChatbotDataXML = await axios.get(url);

    const ChatbotDataJSON: any = chatbotXMLToJSON(ChatbotDataXML.data);
    return new ChatbotDialogue(ChatbotDataJSON);
  };
}

export class FakeAPIHandler implements IAPIHandler {
  getChatbotDialogue = async (): Promise<ChatbotDialogue> => {
    return new ChatbotDialogue(ChatbotData);
  };

  getChatbotDialogueFromTwine = async (
    dataFileName: string
  ): Promise<ChatbotDialogue> => {
    const url: string = `${DEV_BASE_URL}/${dataFileName}.html`;
    const ChatbotDataXML = await axios.get(url);

    const ChatbotDataJSON: any = chatbotXMLToJSON(ChatbotDataXML.data);

    return new ChatbotDialogue(ChatbotDataJSON);
  };
}

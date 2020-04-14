import axios from "axios";

import { ChatbotDialogue } from "../components/Chatbot/types";

import ChatbotData from "../data/chatbotData.json";

const BASE_URL = "http://jamkelley.com/api";

export interface IAPIHandler {
  getChatbotDialogue(): Promise<ChatbotDialogue>;
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
}

export class FakeAPIHandler implements IAPIHandler {
  getChatbotDialogue = async (): Promise<ChatbotDialogue> => {
    return new ChatbotDialogue(ChatbotData);
  };
}

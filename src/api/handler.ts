import axios from "axios";

import { ChatbotDialogue } from "components/Chatbot/types";

import { chatbotXMLToJSON } from "./util";
import { Download, Writing, Accolade, Project } from "./types";
import { message } from "antd";

const BASE_URL = "https://api.jamkelley.com";
const LOCAL_API_BASE_URL = "http://localhost:4000/api";
const DEV_BASE_URL = "http://localhost:5000";

export interface IAPIHandler {
  getChatbotDialogue(dataFileName: string): Promise<ChatbotDialogue>;
  getDownloads(): Promise<Download[]>;
  getWritings(): Promise<Writing[]>;
  getAccolades(): Promise<Accolade[]>;
  getProjects(): Promise<Project[]>;
  getResumeRoute(): Promise<string>;
}

export class APIHandler implements IAPIHandler {
  getChatbotDialogue = async (
    dataFileName: string
  ): Promise<ChatbotDialogue> => {
    const url: string = `${BASE_URL}/chatbot/${dataFileName}.html`;
    const ChatbotDataXML = await axios.get(url);

    const ChatbotDataJSON: any = chatbotXMLToJSON(ChatbotDataXML.data);
    return new ChatbotDialogue(ChatbotDataJSON);
  };

  getDownloads = async (): Promise<Download[]> => {
    const url = `${BASE_URL}/downloads`;
    const downloadsData = await axios.get(url);
    const downloads = await downloadsData.data.downloads.map(
      (data: any) => new Download(data)
    );
    return downloads;
  };

  getWritings = async (): Promise<Writing[]> => {
    const url = `${BASE_URL}/writing`;
    const writingsData = await axios.get(url);
    const writings = await writingsData.data.map((writingDocument: any) => {
      const writingObj = {
        name: writingDocument,
      };
      return new Writing(writingObj);
    });
    return writings;
  };

  getAccolades = async (): Promise<Accolade[]> => {
    const url = `${BASE_URL}/accolades`;
    const accoladesData = await axios.get(url);
    const accolades = await accoladesData.data.map(
      (accolade: any) => new Accolade(accolade)
    );
    return accolades;
  };

  getProjects = async (): Promise<Project[]> => {
    const url = `${BASE_URL}/projects`;
    const projectsData = await axios.get(url);
    const projects = await projectsData.data.map(
      (project: any) => new Project(project)
    );
    return projects;
  };

  getResumeRoute = async (): Promise<string> => {
    const statusURL = `${BASE_URL}/resume/pdf/status`;
    const pdfURL = `${BASE_URL}/resume/pdf`;
    try {
      const response = await axios.get(statusURL);
      if (response.data.error) {
        throw response.data;
      }
    } catch (e) {
      if (e.response.data.error) {
        message.error(e.response.data.message);
      }
      throw e;
    }
    return pdfURL;
  };
}

export class LocalAPIHandler implements IAPIHandler {
  getChatbotDialogue = async (
    dataFileName: string
  ): Promise<ChatbotDialogue> => {
    const url = `${LOCAL_API_BASE_URL}/chatbot/${dataFileName}.html`;
    const ChatbotDataXML = await axios.get(url);

    const ChatbotDataJSON: any = chatbotXMLToJSON(ChatbotDataXML.data);
    return new ChatbotDialogue(ChatbotDataJSON);
  };

  getDownloads = async (): Promise<Download[]> => {
    const url = `${LOCAL_API_BASE_URL}/downloads`;
    const downloadsData = await axios.get(url);
    const downloads = await downloadsData.data.downloads.map(
      (data: any) => new Download(data)
    );
    return downloads;
  };

  getWritings = async (): Promise<Writing[]> => {
    const url = `${LOCAL_API_BASE_URL}/writing`;
    const writingsData = await axios.get(url);

    const writings = await writingsData.data.map((writingDocument: any) => {
      const writingObj = {
        name: writingDocument,
      };
      return new Writing(writingObj);
    });
    return writings;
  };

  getAccolades = async (): Promise<Accolade[]> => {
    const url = `${LOCAL_API_BASE_URL}/accolades`;
    const accoladesData = await axios.get(url);
    console.log(accoladesData);
    const accolades = await accoladesData.data.map(
      (accolade: any) => new Accolade(accolade)
    );
    console.log(accolades);

    return accolades;
  };

  getProjects = async (): Promise<Project[]> => {
    const url = `${LOCAL_API_BASE_URL}/projects`;
    const projectsData = await axios.get(url);
    const projects = await projectsData.data.map(
      (project: any) => new Project(project)
    );
    return projects;
  };

  getResumeRoute = async (): Promise<string> => {
    const statusURL = `${LOCAL_API_BASE_URL}/resume/pdf/status`;
    const pdfURL = `${LOCAL_API_BASE_URL}/resume/pdf`;
    try {
      const response = await axios.get(statusURL);
      if (response.data.error) {
        throw response.data;
      }
    } catch (e) {
      if (e.response.data.error) {
        message.error(e.response.data.message);
      }
      throw e;
    }
    return pdfURL;
  };
}

export class FakeAPIHandler implements IAPIHandler {
  getChatbotDialogue = async (
    dataFileName: string
  ): Promise<ChatbotDialogue> => {
    const url: string = `${DEV_BASE_URL}/${dataFileName}.html`;
    const ChatbotDataXML = await axios.get(url);

    const ChatbotDataJSON: any = chatbotXMLToJSON(ChatbotDataXML.data);

    return new ChatbotDialogue(ChatbotDataJSON);
  };

  getDownloads = async (): Promise<Download[]> => {
    // const url = `${LOCAL_API_BASE_URL}/downloads`;
    // const downloadsData = await axios.get(url);
    // const downloads = await downloadsData.data.downloads.map(
    //   (data: any) => new Download(data)
    // );
    // return downloads;
    return []; //Todo
  };

  getWritings = async (): Promise<Writing[]> => {
    // const url = `${LOCAL_API_BASE_URL}/writing`;
    // const writingsData = await axios.get(url);
    // const writings = await writingsData.data.map((writingDocument: any) => {
    //   const writingObj = {
    //     name: writingDocument,
    //   };
    //   return new WritingDocument(writingObj);
    // });
    return []; //Todo
  };

  getAccolades = async (): Promise<Accolade[]> => {
    // const url = `${LOCAL_API_BASE_URL}/accolades`;
    // const accoladesData = await axios.get(url);
    // const accolades = await accoladesData.data.map((accolade: any) =>
    //   new Accolade(accolade)
    // );
    // return accolades;
    return []; //Todo
  };

  getProjects = async (): Promise<Project[]> => {
    // const url = `${LOCAL_API_BASE_URL}/projects`;
    // const projectsData = await axios.get(url);
    // const projects = await projectsData.data.map(
    //   (project: any) => new Project(project)
    // );
    // return projects;
    return []; //Todo
  };

  getResumeRoute = async (): Promise<string> => {
    // const statusURL = `${LOCAL_API_BASE_URL}/resume/pdf/status`;
    // const pdfURL = `${LOCAL_API_BASE_URL}/resume/pdf`;
    // try {
    //   const response = await axios.get(statusURL);
    //   if (response.data.error) {
    //     throw response.data;
    //   }
    // } catch (e) {
    //   if (e.response.data.error) {
    //     message.error(e.response.data.message);
    //   }
    //   throw e;
    // }
    return "#"; //Todo
  };
}

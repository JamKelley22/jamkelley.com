import React from "react";
import { Button, Spin } from "antd";

import { IAPIHandler, FakeAPIHandler, APIHandler } from "../../api/handler";
import { Response, DialogueNode, ChatbotDialogue } from "./types";

import "./chatbot.scss";

export interface IChatbotProps {
  handler?: IAPIHandler;
}

interface IChatbotState {
  currNode: DialogueNode | null;
  currResponses: Response[];
}

export default class Chatbot extends React.Component<
  IChatbotProps,
  IChatbotState
> {
  static defaultProps = {
    handler:
      process.env.NODE_ENV === "production"
        ? new APIHandler()
        : new FakeAPIHandler(),
  };

  state: IChatbotState = {
    currNode: null,
    currResponses: [],
  };

  componentDidMount() {
    this.initDialogue();
  }

  initDialogue = async () => {
    const dialogue: ChatbotDialogue = await this.props.handler!.getChatbotDialogue();
    const currDNode: DialogueNode | null = dialogue.createDialogueStructure()
      .currDialogueNode;
    if (currDNode) {
      let responses = currDNode.responses;
      this.setState({
        currNode: currDNode,
        currResponses: responses,
      });
    }
  };

  update = (newNode: DialogueNode, newResponses: Response[]) => {
    this.setState({
      currNode: newNode,
      currResponses: newResponses,
    });
  };

  updateWithResponse = (response: Response) => {
    let dNode = response.nextNode;
    if (dNode) {
      let newResponses = dNode.responses;
      this.update(dNode, newResponses);
    } else {
    }
  };

  public render() {
    const { currNode, currResponses } = this.state;
    if (!currNode) return <Spin />;
    return (
      <div id="chatbot">
        <h3>{currNode!.prompt}</h3>
        <div id="allResponses">
          {currResponses.map((response: Response, i: number) => {
            return (
              <div key={i} id="response">
                <Button onClick={() => this.updateWithResponse(response)}>
                  {response.text}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

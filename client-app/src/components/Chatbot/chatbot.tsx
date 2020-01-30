import React from "react";

import { Response, DialogueNode, Dialogue } from "./dialogue";
import { Button } from "antd";

import "./chatbot.scss";

export interface IChatbotProps {}

interface IChatbotState {
  currNode: DialogueNode | null;
  currResponses: Response[];
}

export default class Chatbot extends React.Component<
  IChatbotProps,
  IChatbotState
> {
  state = {
    currNode: Dialogue.currDialogueNode,
    currResponses: []
  };

  componentDidMount() {
    this.initDialogue();
  }

  initDialogue = () => {
    let currDNode = Dialogue.currDialogueNode;
    if (currDNode !== null && currDNode !== undefined) {
      let responses = currDNode.responses;
      this.setState({
        currNode: currDNode,
        currResponses: responses
      });
    }
  };

  update = (newNode: DialogueNode, newResponses: Response[]) => {
    this.setState({
      currNode: newNode,
      currResponses: newResponses
    });
  };

  updateWithResponse = (response: Response) => {
    let dNode = response.nextNode;
    if (dNode !== null) {
      let newResponses = dNode.responses;
      this.update(dNode, newResponses);
    } else {
    }
  };

  public render() {
    const { currNode } = this.state;
    if (!currNode) return;
    return (
      <div id="chatbot">
        <h3>{currNode!.prompt}</h3>
        <div id="allResponses">
          {this.state.currResponses.map((response: Response, i: number) => {
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

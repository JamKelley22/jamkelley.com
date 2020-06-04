import React from "react";
import { Spin } from "antd";

import { IAPIHandler, FakeAPIHandler, APIHandler } from "../../api/handler";
import {
  Response,
  DialogueNode,
  ChatbotDialogue,
  EventFunction,
} from "./types";

import { IChatbotPresentationalProps } from "./chatbotPresentational";

import "./chatbot.scss";
import Stack from "util/stack";

export interface IChatbotProps {
  handler?: IAPIHandler;
  render: (props: IChatbotPresentationalProps) => JSX.Element;
  loadingElement?: JSX.Element;
  dataFileName: string;
}

interface IChatbotState {
  currNode: DialogueNode | null;
  currResponses: Response[];
}

const previousNodes: Stack<DialogueNode> = new Stack();

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

  getEvents = (): EventFunction[] => {
    return [];
  };

  componentDidMount() {
    this.initDialogue();
  }

  initDialogue = async () => {
    const dialogue: ChatbotDialogue = await this.props.handler!.getChatbotDialogueFromTwine(
      this.props.dataFileName
    );
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
    if (this.state.currNode) previousNodes.push(this.state.currNode);

    this.setState({
      currNode: newNode,
      currResponses: newResponses,
    });
  };

  updateWithResponse = (response: Response) => {
    let dNode = response.nextNode;

    if (dNode) {
      dNode.tags.forEach((tag: string) => {
        const event: EventFunction | undefined = this.getEvents().find(
          (event: EventFunction) => event.name === tag
        );

        if (event) event.fn();
      });

      let newResponses = dNode.responses;
      this.update(dNode, newResponses);
    }
  };

  goBackNode = (): boolean => {
    let prevNode: DialogueNode | undefined;
    if (previousNodes.isEmpty()) return false;

    prevNode = previousNodes.pop();
    if (!prevNode) return false;
    this.setState({
      currNode: prevNode,
      currResponses: prevNode.responses,
    });
    return true;
  };

  public render() {
    const { currNode, currResponses } = this.state;
    const { render } = this.props;
    if (!currNode) return <Spin />;

    return render({
      currNode: currNode,
      currResponses: currResponses,
      updateWithResponse: this.updateWithResponse,
      goBackNode: this.goBackNode,
      stack: previousNodes,
    });
  }
}

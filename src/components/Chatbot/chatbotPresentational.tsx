import * as React from "react";
import { Button } from "antd";

import Stack from "util/stack";
import { DialogueNode, Response } from "./types";

export interface IChatbotPresentationalProps {
  currResponses: Response[];
  currNode: DialogueNode | null;
  updateWithResponse: (response: Response) => void;
  goBackNode: () => boolean;
  stack: Stack<DialogueNode>;
}

export function ChatbotPresentational(props: IChatbotPresentationalProps) {
  const { currNode, currResponses, updateWithResponse } = props;
  return (
    <div id="chatbot">
      <h3>{currNode!.prompt}</h3>
      <div id="allResponses">
        {currResponses.map((response: Response, i: number) => {
          return (
            <div key={i} id="response">
              <Button onClick={() => updateWithResponse(response)}>
                {response.text}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export class DialogueStructure {
  currDialogueNode: DialogueNode | null;
  initDialogueNode: DialogueNode | null;

  constructor(initDialogueNode: DialogueNode) {
    this.initDialogueNode = initDialogueNode;
    this.currDialogueNode = initDialogueNode;
  }

  nextDialogueNode(selectedResponse: Response) {
    this.currDialogueNode = selectedResponse.nextNode;
  }
}

export class DialogueNode {
  responses: Response[];
  prompt: string;
  tags: string[];

  constructor(data: DialogueNodeData) {
    this.prompt = data.prompt;
    this.responses = data.responseSet.responses;
    this.tags = data.tags;
  }
}

export class Response {
  text: string;
  nextNode: DialogueNode | null;
  nextNodeIndex: number;

  constructor(data: ResponseData) {
    this.text = data.text;
    this.nextNode = null;
    this.nextNodeIndex = data.nextNodeIndex;
  }

  setNextDialogueNode = (nextNode: DialogueNode | null) => {
    this.nextNode = nextNode;
  };
}

export class ResponseSet {
  responses: Response[];
  constructor(data: any) {
    this.responses = data.map((response: any) => new Response(response));
  }
}

//===================

export class ChatbotData {
  dialogue: ChatbotDialogue;
  constructor(data: any) {
    this.dialogue = new ChatbotDialogue(data.dialogue);
  }
}

export class ChatbotDialogue {
  responses: Response[];
  responseSets: ResponseSet[];
  dialogueNodeData: DialogueNode[];
  constructor(data: any) {
    this.responses = data.chatbot.dialogue.responses.map(
      (responseData: any) =>
        new Response({
          text: responseData.text,
          nextNodeIndex: responseData.nextNodeIndex,
        })
    );

    this.responseSets = data.chatbot.dialogue.responseSets.map(
      (responseSetData: number[]) =>
        new ResponseSet(
          responseSetData.map(
            (responseNum: number) => this.responses[responseNum]
          )
        )
    );

    this.dialogueNodeData = data.chatbot.dialogue.dialogueNodes.map(
      (dialogueNodeData: any) =>
        new DialogueNode({
          prompt: dialogueNodeData.prompt,
          responseSet: this.responseSets[dialogueNodeData.responseSet],
          tags: dialogueNodeData.tags,
        })
    );

    this.responses.forEach((response: Response) =>
      response.setNextDialogueNode(
        this.dialogueNodeData[response.nextNodeIndex]
      )
    );
    this.dialogueNodeData.forEach((node: DialogueNode) =>
      node.responses.forEach((response: Response) =>
        response.setNextDialogueNode(
          this.dialogueNodeData[response.nextNodeIndex]
        )
      )
    );
  }

  createDialogueStructure = (): DialogueStructure => {
    return new DialogueStructure(this.dialogueNodeData[0]);
  };
}

type DialogueNodeData = {
  prompt: string;
  responseSet: ResponseSet;
  tags: string[];
};

type ResponseData = {
  text: string;
  nextNodeIndex: number;
};

export class EventFunction {
  fn: () => void;
  name: string;
  constructor(data: any) {
    this.fn = data.fn;
    this.name = data.name;
  }
}

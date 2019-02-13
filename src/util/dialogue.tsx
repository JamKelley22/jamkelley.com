class DialogueStructure {
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

class DialogueNode {
	responses: Response[];
	prompt: string;
  constructor(prompt: string, responses: Response[]) {
    this.prompt = prompt;
    this.responses = responses;
  }
}

class Response {
	text: string;
	nextNode: DialogueNode | null;
  constructor(text: string) {
    this.text = text;
		this.nextNode = null;
  }

  setNextDialogueNode(nextNode: DialogueNode | null) {
    this.nextNode = nextNode;
  }
}

//Construct all responses
let r01 = new Response("Hi Jameel!");
let r02 = new Response("Tell me about yourself");
let r0 = [r01,r02];

let r11 = new Response("Education and Projects");
let r12 = new Response("Who are you?");
let r1 = [r11,r12];

let r21 = new Response("Do you have any examples?");
let r22 = new Response("That's really cool!");
let r2 = [r21,r22];

let r31 = new Response("Game Jams");
let r32 = new Response("Personal Projects");
let r33 = new Response("Team Projects");
let r3 = [r31,r32,r33];

let r41 = new Response("Restart");
let r4 = [r41];

let r51 = new Response("Restart");
let r5 = [r51];

let r61 = new Response("Game Jams");
let r62 = new Response("Personal Projects");
let r63 = new Response("Team Projects");
let r6 = [r61,r62,r63];

let r71 = new Response("Restart");
let r7 = [r71];

let r81 = new Response("Education and Projects");
let r82 = new Response("Who are you?");
let r8 = [r81,r82];

let r91 = new Response("Restart");
let r9 = [r91];

//Construct all DialogueNodes
let dNode0 = new DialogueNode("Welcome to my website! My name is Jameel",r0)
let dNode1 = new DialogueNode("Sure! Like school and what I've been working on, or who I am and what I do for fun?",r1)
let dNode2 = new DialogueNode("It's my third year at Iowa State University and I plan on graduating in May 2020. I'm majoring in Software Engineering and currently focusing on Web and VR Devlopment. ",r2)
let dNode3 = new DialogueNode("Definatly!",r3)
let dNode4 = new DialogueNode("4-Game Jams",r4)
let dNode5 = new DialogueNode("5-Personal Projects",r5)
let dNode6 = new DialogueNode("I know right! It's amazing creating things. Programming is a rewarding skill to have and Engineering only enhanses what one can do in the real world. Wanna check out what I've done so far?",r6)
let dNode7 = new DialogueNode("7-Team Projects",r7)
let dNode8 = new DialogueNode("Hello stranger! Thanks for visiting :) Anything you want to know?",r8)
let dNode9 = new DialogueNode("Origami, Game Dev Club, Running 5K, Anime, Guitar, Audiobooks, Driving",r9)

//For each response add next DialogueNode
r01.setNextDialogueNode(dNode8);
r02.setNextDialogueNode(dNode1);

r11.setNextDialogueNode(dNode2);
r12.setNextDialogueNode(dNode9);

r21.setNextDialogueNode(dNode3);
r22.setNextDialogueNode(dNode6);

r31.setNextDialogueNode(dNode4);
r32.setNextDialogueNode(dNode5);
r33.setNextDialogueNode(dNode7);

r41.setNextDialogueNode(dNode0);

r51.setNextDialogueNode(dNode0);

r61.setNextDialogueNode(dNode4);
r62.setNextDialogueNode(dNode5);
r63.setNextDialogueNode(dNode7);

r71.setNextDialogueNode(dNode0);

r81.setNextDialogueNode(dNode2);
r82.setNextDialogueNode(dNode9);

r91.setNextDialogueNode(dNode0);

let Dialogue = new DialogueStructure(dNode0);

export { Dialogue }

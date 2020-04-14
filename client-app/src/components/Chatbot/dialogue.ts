// //Construct all responses
// const r01: Response = new Response("Hi Jameel!");
// const r02: Response = new Response("Tell me about yourself");
// const a0: ResponseSet = new ResponseSet([r01, r02]);

// const r11: Response = new Response("Education and Projects");
// const r12: Response = new Response("Who are you?");
// const a1: ResponseSet = new ResponseSet([r11, r12]);

// const r21: Response = new Response("Do you have any examples?");
// const r22: Response = new Response("That's really cool!");
// const a2: ResponseSet = new ResponseSet([r21, r22]);

// const r31: Response = new Response("Game Jams");
// const r32: Response = new Response("Personal Projects");
// const r33: Response = new Response("Team Projects");
// const a3: ResponseSet = new ResponseSet([r31, r32, r33]);

// const r41: Response = new Response("Restart");
// const a4: ResponseSet = new ResponseSet([r41]);

// const r51: Response = new Response("Restart");
// const a5: ResponseSet = new ResponseSet([r51]);

// const r61: Response = new Response("Game Jams");
// const r62: Response = new Response("Personal Projects");
// const r63: Response = new Response("Team Projects");
// const a6: ResponseSet = new ResponseSet([r61, r62, r63]);

// const r71: Response = new Response("Restart");
// const a7: ResponseSet = new ResponseSet([r71]);

// const r81: Response = new Response("Education and Projects");
// const r82: Response = new Response("Who are you?");
// const a8: ResponseSet = new ResponseSet([r81, r82]);

// const r91: Response = new Response("Restart");
// const a9: ResponseSet = new ResponseSet([r91]);

// //Construct all DialogueNodes
// let dNode0 = new DialogueNode("Welcome to my website!", a0);
// let dNode1 = new DialogueNode(
//   "Sure! Like school and what I've been working on, or who I am and what I do for fun?",
//   a1
// );
// let dNode2 = new DialogueNode(
//   "It's my final year at Iowa State University and I will be graduating in May 2020 with a BS in Software Engineering. I'm currently focusing on Web and VR Devlopment. ",
//   a2
// );
// let dNode3 = new DialogueNode("Definatly!", a3);
// let dNode4 = new DialogueNode("4-Game Jams", a4);
// let dNode5 = new DialogueNode("5-Personal Projects", a5);
// let dNode6 = new DialogueNode(
//   "I know right! It's amazing creating things. Programming is a rewarding skill to have and Engineering only enhanses what one can do in the real world. Wanna check out what I've done so far?",
//   a6
// );
// let dNode7 = new DialogueNode("7-Team Projects", a7);
// let dNode8 = new DialogueNode(
//   "Hello stranger! Thanks for visiting :) Anything you want to know?",
//   a8
// );
// let dNode9 = new DialogueNode(
//   "Origami, Game Dev Club, Running 5K, Anime, Guitar, Audiobooks, Driving",
//   a9
// );

// //For each response add next DialogueNode
// r01.setNextDialogueNode(dNode8);
// r02.setNextDialogueNode(dNode1);

// r11.setNextDialogueNode(dNode2);
// r12.setNextDialogueNode(dNode9);

// r21.setNextDialogueNode(dNode3);
// r22.setNextDialogueNode(dNode6);

// r31.setNextDialogueNode(dNode4);
// r32.setNextDialogueNode(dNode5);
// r33.setNextDialogueNode(dNode7);

// r41.setNextDialogueNode(dNode0);

// r51.setNextDialogueNode(dNode0);

// r61.setNextDialogueNode(dNode4);
// r62.setNextDialogueNode(dNode5);
// r63.setNextDialogueNode(dNode7);

// r71.setNextDialogueNode(dNode0);

// r81.setNextDialogueNode(dNode2);
// r82.setNextDialogueNode(dNode9);

// r91.setNextDialogueNode(dNode0);

class test {}

export { test };

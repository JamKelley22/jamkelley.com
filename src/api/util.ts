import { Passage, PassageResponse } from "./types";

// Changes XML to JSON
function xml2json(xml: any) {
  // Create the return object
  var obj = {};

  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      // @ts-ignore
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        // @ts-ignore
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      // @ts-ignore
      if (typeof obj[nodeName] == "undefined") {
        // @ts-ignore
        obj[nodeName] = xml2json(item);
      } else {
        // @ts-ignore
        if (typeof obj[nodeName].push == "undefined") {
          // @ts-ignore
          var old = obj[nodeName];
          //@ts-ignore
          obj[nodeName] = [];
          //@ts-ignore
          obj[nodeName].push(old);
        }
        //@ts-ignore
        obj[nodeName].push(xml2json(item));
      }
    }
  }
  return obj;
}

export const chatbotXMLToJSON = (data: string): any => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/html");
  const json: any = xml2json(xmlDoc);

  const passages: Passage[] = json.HTML.BODY["TW-STORYDATA"][
    "TW-PASSAGEDATA"
  ].map((passage: any) => new Passage(passage));

  const responseDataJSON = passages.map((passage: Passage) => {
    const responses: PassageResponse[] = passage.responses;

    return responses.map((response: PassageResponse) => {
      return {
        text: response.text,
        nextNodeIndex: passages.findIndex(
          (otherPassage: Passage) =>
            otherPassage.name === response.nextPassageName
        ),
      };
    });
  });

  const dialogueNodesData = passages.map((passage: Passage, i: number) => {
    return {
      prompt: passage.text,
      responseSet: i,
      tags: passage.tags,
    };
  });

  let count = 0;
  const responseSetData = responseDataJSON.map(
    (responseSet: any[], i: number) =>
      responseSet.map((response: any, j: number) => count++)
  );

  return {
    chatbot: {
      dialogue: {
        responses: responseDataJSON.flat(),
        responseSets: responseSetData,
        dialogueNodes: dialogueNodesData,
      },
    },
  };
};

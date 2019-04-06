import to from 'await-to-js';

let BASE_URL = 'http://jamkelley.com:4000/graphql';

const GET_QOTD = `{
  getQOTD {
    QuestionID
    Answers
    Prompt
  }
}`;

const ADD_RESPONSE = (QuestionID,Answer,Username) =>
`mutation addResponse($qid: Int = ${QuestionID}, $ans: String = "${Answer}", $user: String = "${Username}") {
  addResponse(QuestionID: $qid, Answer: $ans, Username: $user)
}`;

const GET_VOTED = (QuestionID,Username) =>
`{
  getVoted(QuestionID: ${QuestionID}, Username: "${Username}")
}`;

const GET_VOTES = (QuestionID) =>
`{
  getVotes(QuestionID: ${QuestionID}) {
    Response
    Count
  }
}`;

export async function getQOTD() {
  let ret = await retrive(GET_QOTD);
  return ret.data.getQOTD;
}

export async function getVoted(QuestionID,Username) {
  let getVoted = GET_VOTED(QuestionID,Username);
  let ret = await retrive(getVoted);
  return ret.data.getVoted;
}

export async function getVotes(QuestionID) {
  let getVotes = GET_VOTES(QuestionID);
  let ret = await retrive(getVotes);
  return ret.data.getVotes;
}

export async function addResponse(QuestionID,Answer,Username) {
  let addResponse = ADD_RESPONSE(QuestionID,Answer,Username);
  let ret = await retrive(addResponse);
  return ret.data.addResponse;
}

async function retrive(query) {
  let response, data, err;
  [err, response] = await to(
    fetch(BASE_URL,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({query: query})
    })
  )
  if(err) {
    console.error(err);
    return;
  }
  [ err, data ] = await to(response.json());
  if(err) {
    console.error(err);
    return;
  }
  return(data);
}

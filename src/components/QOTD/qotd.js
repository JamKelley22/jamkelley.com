import React, { useState, useEffect } from 'react';
import Fingerprint2 from 'fingerprintjs2'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

import * as API from '../../api/api.js'

ReactChartkick.addAdapter(Chart)

const qotd = (props) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['']);
  const [questionID, setQuestionID] = useState(-1);
  const [voted, setVoted] = useState('');
  const [ans, setAns] = useState('');
  const [userHash, setUserHash] = useState('');
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    let qotd;
    async function fetchData() {
      qotd = await API.getQOTD();
      setPrompt(qotd.Prompt);
      setAnswers(qotd.Answers.split(','));
      setQuestionID(qotd.QuestionID);

      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
            Fingerprint2.get(function (components) {
              var values = components.map(function (component) { return component.value })
              var murmur = Fingerprint2.x64hash128(values.join(''), 31)
              setUserHash(murmur)
              checkVoted(murmur,qotd.QuestionID)
            })
        })
      } else {
          setTimeout(function () {
              Fingerprint2.get(function (components) {
                var values = components.map(function (component) { return component.value })
                var murmur = Fingerprint2.x64hash128(values.join(''), 31)
                setUserHash(murmur)
                checkVoted(murmur,qotd.QuestionID)
              })
          }, 500)
      }
    }
    fetchData();

  }, []);

  async function checkVoted(Username,QuestionID) {
    let voted = await API.getVoted(QuestionID, Username);
    if(voted) {
      setVoted('It seems you have already voted for today')
      updateVotes(QuestionID)
    }
  }

  async function sendResponse(answer) {
    let response = await API.addResponse(questionID,answer,userHash);
    if(response === null) {
      // Already Voted
      setVoted('It seems you have already voted for today');
    }
    else {
      // Vote!
      setAns(response);
      setVoted('Thanks for Voting!');
    }
    updateVotes(questionID)
  }

  async function updateVotes(QuestionID) {
    let votes = await API.getVotes(QuestionID);

    let newVotes = [];
    votes.forEach(vote =>
      newVotes.push(Object.values(vote))
    )
    console.log(newVotes);
    setVotes(newVotes);
  }

  return (
    <div>
      <h2>Question of the Day:</h2>
      {
        voted === '' ?

        <div>
          <h3>{prompt}</h3>
          <ol>
            {answers.map((answer,i) =>
              <li key={i}>
                <button onClick={() => sendResponse(answer)}>{answer}</button>
              </li>
            )}
          </ol>
        </div>

        :

        <div>
          <h3>{prompt}</h3>
          <ol>
            {answers.map((answer,i) =>
              <li key={i}>
                {
                  answer === ans ?
                  <button>{answer}</button>
                  :
                  <button disabled>{answer}</button>
                }
              </li>
            )}
          </ol>
          <h4>{voted}</h4>
        </div>
      }

      {
        voted
        &&
        <PieChart data={votes} />
      }
    </div>
  )
}

export default qotd;

import React from 'react'

import * as _Dialogue from '../../util/dialogue'

import './chatbot.module.scss'

class ChatBot extends React.Component {
  state = {
    currPrompt: '',
    currResponses: []
  }

  componentDidMount() {
    let currDNode = _Dialogue.dialogue.currDialogueNode;
    if(currDNode !== null && currDNode !== undefined) {
      let responses = currDNode.responses;
      let prompt = currDNode.prompt;
      this.setState({
        currPrompt: prompt,
        currResponses: responses
      })
    }
  }

  update = (newPrompt, newResponses) => {
    this.setState({
      currPrompt: newPrompt,
      currResponses: newResponses
    })
  }

  updateWithResponse = (response) => {
    let dNode = response.nextNode;
    if(dNode !== null) {
      let newPrompt = dNode.prompt;
      let newResponses = dNode.responses;
      this.update(newPrompt,newResponses);
    }
    else {

    }

  }

  render () {
    return(
      <div className='chatBotComponent'>
        <h3>{this.state.currPrompt}</h3>
        {
          this.state.currResponses.map((response, i) => {
            return (
              <div key={i} className='response'>
                <button onClick={() => this.updateWithResponse(response)}>{response.text}</button>
              </div>
            )
          })
        }
        <hr/>
      </div>
    )
  }
}

export default ChatBot;

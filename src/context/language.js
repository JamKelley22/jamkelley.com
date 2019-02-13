import React from 'react'
import { languages } from '../design/constants.js'

const LanguageContext = React.createContext();

const LanguageConsumer = LanguageContext.Consumer;

const initLanguage = languages.english;

class LanguageProvider extends React.Component {
  state = {
    language: initLanguage
  }

  updateLanguage = (newLanguage) => {
    this.setState({
      language: newLanguage
    })
  }

  render () {
    return (
      <LanguageContext.Provider
      value={{
        language: this.state.language,
        updateLanguage: this.updateLanguage
      }}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}

export { LanguageProvider, LanguageContext, LanguageConsumer, initLanguage }

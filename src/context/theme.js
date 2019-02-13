import React from 'react'
import { themes } from '../design/constants.js'

const ThemeContext = React.createContext();

const ThemeConsumer = ThemeContext.Consumer;

const initTheme = themes.light;

class ThemeProvider extends React.Component {
  state = {
    theme: initTheme
  }

  updateTheme = (newTheme) => {
    this.setState({
      theme: newTheme
    })
  }

  render () {
    return (
      <ThemeContext.Provider
      value={{
        theme: this.state.theme,
        updateTheme: this.updateTheme
      }}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export { ThemeProvider, ThemeContext, ThemeConsumer, initTheme }

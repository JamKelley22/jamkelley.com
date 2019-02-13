import React from 'react'

import { ThemeConsumer } from '../../context'
import { themes } from '../../design/constants.js'

class Settings extends React.Component {

  toggleTheme = (themeObj) => {
    let newTheme = (themeObj.theme.base.name === themes.light.base.name ? themes.dark : themes.light)
    themeObj.updateTheme(newTheme);
  }

  render () {
    return(
      <ThemeConsumer>
      {themeObj =>
        <div className='settingsComponent'>
          <button onClick={() => this.toggleTheme(themeObj)}>Toggle Theme</button>
        </div>
      }
      </ThemeConsumer>
    )
  }
}

export default Settings;

import React from 'react'
import PropTypes from 'prop-types'

import { ThemeConsumer } from '../context'


import './util.scss'

const Button = ({name, onClick, children, size}) => {
  return (
    <ThemeConsumer>
      {themeObj =>
        <button
        onClick={onClick}
        className={`button buttonSmall`}
        style={themeObj.theme.button}>
          <span
          className='buttonText'>
            {children || name}
          </span>
        </button>
      }
    </ThemeConsumer>
  )
}

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  name: 'Click Me',
  onClick: () => console.warn("Buttons need an onClick prop function!"),
  size: 'medium'
};

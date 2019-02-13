import React from 'react'
import PropTypes from 'prop-types'

import './youtube.module.scss'

class Video extends React.Component {
  state = {
    isFullscreen: false
  }

  toggleFullscreen = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    })
  }

  render() {
    let videoSrc = `https://www.youtube.com/embed/${this.props.src}?autoplay=false`;

    let style = {}
    if(!this.state.isFullscreen) {
      style = {
        width: '100%',
        height: '100%'
      }
    }
    else {
      style = {
        position: 'absolute',
        width: '100%',
        height: '100%'
      }
    }
    return(
      <div>
        <button onClick={this.toggleFullscreen}>Fullscreen</button>
        <iframe
          className="player"
          type="text/html"
          style={style}
          src={videoSrc}
          frameBorder="0"
          fullscreen="0"
          allowFullScreen
          title={this.props.title}
        />
      </div>
    );
  }
}

export default Video;

Video.propTypes = {
  src: PropTypes.string
}

Video.defaultProps = {
  src: 'dQw4w9WgXcQ',
  title: 'YoutubeVideo'
}

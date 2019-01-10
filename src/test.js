import React from 'react'
import openSocket from 'socket.io-client';
import { subscribe } from './sock-test.js'

class Test extends React.Component {
  state = {
    img: null,
    images: []
  }

  componentDidMount() {
    //this.getImage();
    //this.mongoQuery();
    this.getImagesQuery();
    subscribe(this.getImagesQuery);
  }

  getImage = async() => {
    let res = await fetch('http://jamkelley.com:3000/pic');
    console.log(res);
    let blob = await res.blob();
    console.log(blob);
    var objectURL = URL.createObjectURL(blob);
    console.log(objectURL);
    this.setState({
      img: objectURL
    })
  }

  mongoQuery = async() => {
    let res = await fetch('http://jamkelley.com:3000/mongo')
    console.log(res);
    let blob = await res.blob();
    let objectURL = URL.createObjectURL(blob);
    this.setState({
      img: objectURL
    })
  }

  getImagesQuery = async() => {
    let res = await fetch('http://jamkelley.com:3000/pictures')
    let images = await res.json();

    images.map(image => {
      fetch(`http://jamkelley.com:3000/picture/${image.name}`).then(res => {
        res.blob().then(blob => {
          var objectURL = URL.createObjectURL(blob);
          image.url = objectURL;
          this.setState({
            images: images
          })
        }).catch(err => {
          console.error(err);
        })
      }).catch(err => {
        console.error(err);
      })
    })
  }

  render () {
    return(
      <div>
        {
          this.state.images.length > 0
          ?
          this.state.images.map((image, i) => {
            console.log(image);
            console.log(image.url);
            return (
              <img key={i} src={image.url} style={{width: '50px'}}/>
            )
          })
          :
          <h3>Loading...</h3>
        }
      </div>
    )
  }
}

export default Test;

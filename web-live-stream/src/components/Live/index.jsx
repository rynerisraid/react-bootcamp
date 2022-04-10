import React, { Component } from 'react';

import flvjs from 'flv.js'

export default class Live extends Component {

    //rtmp://localhost:3001/xqlive  key: demo
    //
    initFlv = ($video) => {
      if ($video) {
        if (flvjs.isSupported()) {
          let flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: 'http://192.168.2.45:3002/xqlive/demo.flv'             
          });
          flvPlayer.attachMediaElement($video);
          flvPlayer.load();
          flvPlayer.play();
          this.flvPlayer = flvPlayer;
        }
      }
    }


    componentWillUnmount() {
      if (this.flvPlayer) {
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
      }
    }
  
    render() {
      const { className, style } = this.props;
      return (
        <video
          
          className="video"
          controls={true}
          style={Object.assign({
            width: '100%',
          }, style)}
          ref={this.initFlv}
        />
      )
    }
  }
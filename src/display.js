import React, { Component } from 'react'
import './css/display.css'

class Display extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayText: 'Waiting for input',
      drumKeys: [
        {
          keyCode: 'Q',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
          description: 'Heater-1'
        },
        {
          keyCode: 'W',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
          description: 'Heater-2'
        },
        {
          keyCode: 'E',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
          description: 'Heater-3'
        },
        {
          keyCode: 'A',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
          description: 'Heater-4'
        },
        {
          keyCode: 'S',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
          description: 'Clap'
        },
        {
          keyCode: 'D',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
          description: 'Open-HH'
        },
        {
          keyCode: 'Z',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
          description: 'Kick-n\'-Hat'
        },
        {
          keyCode: 'X',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
          description: 'Kick'
        },
        {
          keyCode: 'C',
          audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
          description: 'Closed-HH'
        }
      ]
    }
    document.addEventListener('keydown', this.onKeyDown)
  }

  playAudioSound(element) {
    if (element) {
      if (!element.paused) {
        element.currentTime = 0;
        element.pause()
      }
      this.playing = element.play()
      if (this.playing) {
        this.playing.catch(error => console.log('error: ' + error))
      }
    }
  }

  playSound = (e) => {
    const { drumKeys } = this.state
    const key = drumKeys.find(key => { return key.keyCode === e.target.id })
    if (key) {
      this.setState({
        displayText: key.description
      })
      this.playAudioSound(e.target.firstElementChild);
    }
  }

  onKeyDown = (e) => {
    const { drumKeys } = this.state
    const key = drumKeys.find(key => { return key.keyCode === String.fromCharCode(e.keyCode) })
    if (key) {
      this.setState({
        displayText: key.description
      })
      this.playAudioSound(document.getElementById(String.fromCharCode(e.keyCode)).firstElementChild)
    }
  }

  getDrumKeys = () => {
    const { drumKeys } = this.state
    return (
      <div className='drumGrid'>
        {
          drumKeys.map((key, ix) => {
            const keyName = `${key.keyCode}-drum-pad`
            return (
              <div key={keyName + ix} id={keyName} className='drum-pad'>
                <button onClick={this.playSound} id={key.keyCode}>
                  {key.keyCode}
                  <audio src={key.audioClip} className='clip' id={key.keyCode} preload='auto' />
                </button>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div id="drum-display" onKeyDown={this.onKeyDown} tabIndex="0">
        {this.getDrumKeys()}
        <div id='display'>
          {this.state.displayText}
        </div>
      </div>
    )
  }
}

export default Display
// Write your code here
import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeLimitInMinutes: 25,
    timeElapsedInSeconds: 60,
    isDisabled: false,
    minutes: 25,
    seconds: 0,
  }

  componentDidMount() {
    this.incrementTimeElapsedInSeconds = () => {
      const {minutes, seconds} = this.state

      if (seconds > 0) {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1,
        }))
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.intervalId)
          //   this.setState({isTimerRunning: false})
        } else {
          this.setState(prevState => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }))
        }
      }
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onClickReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      isTimerRunning: false,
      isDisabled: false,
      timeLimitInMinutes: 25,
      minutes: 25,
      seconds: 0,
    })
  }

  onDecreaseSetTimerMinutes = () => {
    const {timeLimitInMinutes} = this.state

    if (timeLimitInMinutes > 0) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
        timeElapsedInSeconds: prevState.timeElapsedInSeconds - 60,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncreaseSetTimerMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 60,
      minutes: prevState.minutes + 1,
    }))
  }

  onClickStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
      isDisabled: true,
    }))
  }

  render() {
    const {
      isTimerRunning,
      timeLimitInMinutes,
      isDisabled,
      minutes,
      seconds,
    } = this.state

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    const startOrPauseText = isTimerRunning ? 'Pause' : 'Start'
    const timerStatusText = isTimerRunning ? 'Running' : 'Paused'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-bg">
            <div className="timer">
              <h1 className="count-down-time">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="time-status">{timerStatusText}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controls-container">
              <div className="container">
                <button
                  type="button"
                  className="control-button text"
                  onClick={this.onClickStartOrPauseTimer}
                >
                  <img src={imageUrl} alt={altText} className="icon" />
                  {startOrPauseText}
                </button>
              </div>
              <div className="container">
                <button
                  type="button"
                  className="control-button"
                  onClick={this.onClickReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <p className="text">Reset</p>
              </div>
            </div>
            <div className="timer-limit-container">
              <p className="set-timer-text">Set Timer limit</p>
              <div className="timer-limit">
                <button
                  type="button"
                  className="decrease-btn"
                  onClick={this.onDecreaseSetTimerMinutes}
                  disabled={isDisabled}
                >
                  -
                </button>
                <p className="timer-limit-count">{timeLimitInMinutes}</p>
                <button
                  type="button"
                  className="increase-btn"
                  onClick={this.onIncreaseSetTimerMinutes}
                  disabled={isDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

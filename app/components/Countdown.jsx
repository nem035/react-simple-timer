/*
eslint
  import/no-unresolved: "off",
  no-console: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const CountDownForm = require('CountDownForm');
const Controls = require('Controls');
const Timer = require('Timer');

const {
  clockStatuses: {
    CLEARED, RUNNING, PAUSED, INVALID,
  },
} = require('utils');

class CountDown extends Timer {

  constructor(props) {
    super(props);

    this.runTimerInterval = this.runTimerInterval.bind(this);
  }

  runTimerInterval() {
    let { status, seconds } = this.state;
    seconds -= 1;
    if (seconds === 0) {
      status = CLEARED;
      this.setState({
        seconds,
        status,
      });
    } else {
      this.setState({
        seconds,
      });
    }
  }

  renderControlArea() {
    const { status } = this.state;
    switch (status) {
      case CLEARED:
        return <CountDownForm onStartCountDown={this.handleStartTimer} />;
      case RUNNING:
      case PAUSED:
        return <Controls status={status} onStatusChange={this.handleStatusChange} />;
      default:
        console.error(`CountDown.renderControlArea: ${INVALID} status ${status}`);
        return null;
    }
  }
}

module.exports = CountDown;

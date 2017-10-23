import React from 'react';
import CSSModules from 'react-css-modules';
import { Device } from 'zp-core';
import styles from './index.less';

/**
 * @description Token
 * 获取验证码
 **/

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.handleClick = this.handleClick.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.state = {
      active: false,
      time: 0
    };
  }

  componentWillMount() {
    const formToken = Device.storage.getItem('ZP_form_token');

    if (formToken) {
      if (formToken.end > new Date().getTime()) {
        this.startInterval(formToken.end - new Date().getTime());
      }
    }
  }

  componentWillUnmount() {
    this.endInterval();
  }

  handleClick() {
    const active = this.state.active;

    if (!active) {
      this.props.onClick((flag) => {
        if (flag) {
          this.startInterval(this.props.delay);
        }
      });
    }
  }

  startInterval(time) {
    this.setState({
      active: true,
      time
    }, () => {
      Device.storage.setItem('ZP_form_token', {
        start: new Date().getTime(),
        end: new Date().getTime() + time,
      });

      this.interval = setInterval(() => {
        const nowTime = this.state.time - 1000;

        if (nowTime < 0) {
          this.endInterval();
        } else {
          this.setState({
            time: nowTime
          });
        }
      }, 1000);
    });
  }

  endInterval() {
    this.setState({
      active: false,
      time: 0
    });
    clearInterval(this.interval);
  }

  render() {
    const active = this.state.active;
    const time = this.state.time;
    return (
      <div className={`token-btn ${active ? 'active' : ''}`} onClick={this.handleClick}>
        { active ? `${parseInt(time / 1000, 10)}秒` : '获取验证码' }
      </div>
    );
  }
}

Token.propTypes = {
  delay: React.PropTypes.number,
  onClick: React.PropTypes.func
};

Token.defaultProps = {
  delay: 60000,
  onClick: () => {}
};

export default CSSModules(Token, styles);

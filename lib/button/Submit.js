import React from 'react';
import CSSModules from 'react-css-modules';
import { Button } from 'antd-mobile';
import styles from './index.less';

/**
 * @description ButtonSubmit
 * 表单提交按钮
 **/

class ButtonSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.loadingShow = this.loadingShow.bind(this);
    this.loadingHide = this.loadingHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timeout = null;
    this.startTime = 0;
    this.state = {
      loading: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  loadingShow() {
    this.startTime = new Date().getTime();
    this.setState({
      loading: true
    });
  }

  loadingHide() {
    const endTime = new Date().getTime();
    const time = endTime - this.startTime;

    if (time < this.props.delay) {
      this.timeout = setTimeout(() => {
        this.loadingHide();
      }, time + 50);
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleClick() {
    const loading = this.state.loading;
    if (loading) return;

    this.props.onClick((flag) => {
      if (flag) this.loadingShow();
      else this.loadingHide();
    });
  }

  render() {
    const loading = this.state.loading;
    const type = this.props.type;
    return (
      <Button className={`zp-btn-submit ${type}`} type="primary" loading={loading} onClick={this.handleClick}>{this.props.children}</Button>
    );
  }
}

ButtonSubmit.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
  type: React.PropTypes.string,
  delay: React.PropTypes.number
};

ButtonSubmit.defaultProps = {
  onClick: () => {},
  children: null,
  type: 'primary',
  delay: 600
};

export default CSSModules(ButtonSubmit, styles, {
  allowMultiple: true
});

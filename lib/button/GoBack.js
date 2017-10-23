import React from 'react';
import CSSModules from 'react-css-modules';
// import { Button } from 'antd-mobile';
import { Router, History } from 'zp-core';
import styles from './index.less';

/**
 * @description ButtonGoBack
 * 返回按钮
 **/

class ButtonGoBack extends React.Component {
  render() {
    const history = History.getList();
    const length = history.length;
    return length <= 1 ? (
      <div
        className="zp-button-back"
        onClick={() => {
          if (this.props.url) Router.push(this.props.url);
        }}
      />
    ) : null;
  }
}

ButtonGoBack.propTypes = {
  url: React.PropTypes.string
};

ButtonGoBack.defaultProps = {
  url: ''
};

export default CSSModules(ButtonGoBack, styles, {
  allowMultiple: true
});

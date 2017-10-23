import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import List from './list';

/**
 * @description 单选按钮
 **/
const Radio = React.createClass({
  statics: {
    List
  },
  render() {
    return null;
  }
});

export default CSSModules(Radio, styles);

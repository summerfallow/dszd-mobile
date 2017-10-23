import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import RangePicker from './RangePicker';

/**
 * @description DatePicker
 **/
const DatePicker = React.createClass({
  statics: {
    RangePicker
  },
  render() {
    return null;
  }
});

export default CSSModules(DatePicker, styles);

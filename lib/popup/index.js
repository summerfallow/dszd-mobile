import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Sort from './sort';

/**
 * @description Popup
 **/
const Popup = React.createClass({
  statics: {
    Sort
  },
  render() {
    return null;
  }
});

export default CSSModules(Popup, styles);

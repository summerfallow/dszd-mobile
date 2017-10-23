import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Filter from './Filter';
import Group from './Group';
import Sort from './Sort';
import Picker from './Picker';
import District from './District';

/**
 * @description DatePicker
 **/
const DatePicker = React.createClass({
  statics: {
    Filter,
    Group,
    Sort,
    Picker,
    District
  },
  render() {
    return null;
  }
});

export default CSSModules(DatePicker, styles);

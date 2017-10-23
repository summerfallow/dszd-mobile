import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Open from './Open';
import Picker from './Picker';
import Select from './Select';

/**
 * @description Tag
 **/
const Tag = React.createClass({
  statics: {
    Open,
    Picker,
    Select
  },
  render() {
    return null;
  }
});

export default CSSModules(Tag, styles);

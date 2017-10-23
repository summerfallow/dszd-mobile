import React from 'react';
import CSSModules from 'react-css-modules';
import { Picker as AntdPicker } from 'antd-mobile';
import PickerItem from './pickerItem';
import District from './district';
import styles from './index.less';
import SysData from '../common/sysData';

/**
 * @description DatePicker
 **/
const Picker = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
    extra: React.PropTypes.string,
    cols: React.PropTypes.number
  },
  statics: {
    District
  },
  getDefaultProps() {
    return {
      onChange: () => {},
      extra: '请选择',
      data: [],
      cols: 1
    };
  },
  getInitialState() {
    return {
      value: [null]
    };
  },
  handleChange(value) {
    this.setState({
      value
    });

    this.props.onChange(value[0]);
  },
  render() {
    const value = this.state.value;
    return (
      <div styleName="picker">
        <AntdPicker
          data={SysData.handle.getDataSource(this.props.data)}
          value={value}
          extra={this.props.extra}
          cols={this.props.cols}
          onChange={this.handleChange}
        >
          <PickerItem />
        </AntdPicker>
      </div>
    );
  }
});

export default CSSModules(Picker, styles);

import React from 'react';
import { DatePicker } from 'antd-mobile';
import { Utils } from 'zp-core';
import CSSModules from 'react-css-modules';
import RangePickerItem from './RangePickerItem';
import styles from './index.less';

/**
 * @description RangePicker
 * 日期选择范围
 **/
class RangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: [null, null]
    };
  }

  handleChange(index, dateValue) {
    const value = this.state.value;
    value[index] = dateValue;

    this.setState({
      value
    });

    if (this.props.format) {
      this.props.onChange([
        Utils.dateFormat(value[0], this.props.format),
        Utils.dateFormat(value[1], this.props.format)
      ]);
    } else {
      this.props.onChange(value);
    }
  }

  render() {
    const value = this.state.value;
    return (
      <div styleName="range-picker">
        <DatePicker
          mode="date"
          title="选择日期"
          extra="开始时间"
          value={value[0]}
          maxDate={value[1]}
          onChange={(dateValue) => { this.handleChange(0, dateValue); }}
        >
          <RangePickerItem />
        </DatePicker>
        <span styleName="range-picker-block">-</span>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="结束时间"
          value={value[1]}
          minDate={value[0]}
          onChange={(dateValue) => { this.handleChange(1, dateValue); }}
        >
          <RangePickerItem />
        </DatePicker>
      </div>
    );
  }
}

RangePicker.propTypes = {
  onChange: React.PropTypes.func,
  format: React.PropTypes.string
};

RangePicker.defaultProps = {
  onChange: () => {},
  format: null
};

export default CSSModules(RangePicker, styles);

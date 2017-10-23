import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description RangePickerItem
 * 日期选择范围项
 **/

class RangePickerItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.onClick();
  }
  render() {
    return (
      <div
        styleName="range-picker-item"
        onClick={this.handleChange}
      >
        {this.props.children}
        <span>{this.props.extra}</span>
      </div>
    );
  }
}

RangePickerItem.propTypes = {
  extra: React.PropTypes.any,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func
};

RangePickerItem.defaultProps = {
  extra: null,
  children: null,
  onClick: () => {}
};

export default CSSModules(RangePickerItem, styles);

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description PickerItem
 * 选择项
 **/

class PickerItem extends React.Component {
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
        styleName="picker-item"
        onClick={this.handleChange}
      >
        {this.props.children}
        <span>{this.props.extra}</span>
      </div>
    );
  }
}

PickerItem.propTypes = {
  extra: React.PropTypes.any,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func
};

PickerItem.defaultProps = {
  extra: null,
  children: null,
  onClick: () => {}
};

export default CSSModules(PickerItem, styles);

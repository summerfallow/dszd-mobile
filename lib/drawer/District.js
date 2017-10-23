import React from 'react';
import CSSModules from 'react-css-modules';
import { District } from 'zp-core';
import { PickerView, Flex, Button } from 'antd-mobile';
import styles from './index.less';

const FlexItem = Flex.Item;

/**
 * @description DrawerDistrict
 * 抽屉-选择器
 **/
class DrawerDistrict extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedValue: District.getAllCode(this.props.data, this.props.defaultValue) || [],
      selectedName: District.getNameByCode(this.props.data, this.props.defaultValue) || ''
    };
  }

  handleChange(value) {
    this.setState({
      selectedValue: value
    });
  }

  clear() {
    this.setState({
      selectedValue: [],
      selectedName: ''
    }, () => {
      this.props.onChange('');
      this.context.hideDrawer();
    });
  }

  handleOk() {
    const data = this.state.selectedValue;
    let item = '';

    if (data[0]) item = data[0];
    if (data[1]) item = data[1];
    if (data[2]) item = data[2];

    this.setState({
      selectedName: District.getNameByCode(this.props.data, item)
    }, () => {
      this.context.hideDrawer();
      this.props.onChange(item);
    });
  }

  renderSidebar() {
    const data = this.props.data;
    const selectedValue = this.state.selectedValue;
    const cols = this.props.cols;
    const extra = this.props.extra;

    return (
      <div styleName="drawer-group-sidebar">
        <div styleName="drawer-district">
          {
            extra ? <div styleName="drawer-district-extra">{extra}</div> : null
          }
          <PickerView
            value={selectedValue}
            data={data}
            cols={cols}
            onChange={this.handleChange}
          />
          <Flex className="drawer-picker-btn">
            <FlexItem><Button onClick={this.clear}>清除</Button></FlexItem>
            <FlexItem><Button type="primary" onClick={this.handleOk}>确定</Button></FlexItem>
          </Flex>
        </div>
      </div>
    );
  }

  render() {
    const name = this.state.selectedName || this.props.title;
    return (
      <div className="zp-drawer-btn" styleName="btn-content">
        <div className="zp-drawer-btn" styleName="btn-title">{name}</div>
        <div className="zp-drawer-btn" styleName="btn-icon" />
        { this.props.show && this.renderSidebar() }
      </div>
    );
  }
}

DrawerDistrict.propTypes = {
  data: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  cols: React.PropTypes.number,
  defaultValue: React.PropTypes.any,
  extra: React.PropTypes.string
};

DrawerDistrict.defaultProps = {
  cols: 3,
  data: [],
  title: '',
  show: false,
  onChange: () => {},
  defaultValue: '',
  extra: null
};

DrawerDistrict.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerDistrict, styles);

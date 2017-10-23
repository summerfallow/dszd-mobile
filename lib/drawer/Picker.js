import React from 'react';
import CSSModules from 'react-css-modules';
import { PickerView, Flex, Button } from 'antd-mobile';
import SysData from '../common/sysData';
import styles from './index.less';

const FlexItem = Flex.Item;

/**
 * @description DrawerPicker
 * 抽屉-选择器
 **/
class DrawerPicker extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedValue: this.props.defaultValue ? [this.props.defaultValue] : [],
      selectedName: this.props.defaultValue ? SysData.handle.getConfigName(this.props.data, this.props.defaultValue) : ''
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
      selectedName: item ? SysData.handle.getConfigName(this.props.data, item) : ''
    }, () => {
      this.context.hideDrawer();
      this.props.onChange(item);
    });
  }

  renderSidebar() {
    const data = SysData.handle.getDataSource(this.props.data);
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

DrawerPicker.propTypes = {
  data: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  cols: React.PropTypes.number,
  defaultValue: React.PropTypes.any,
  extra: React.PropTypes.string
};

DrawerPicker.defaultProps = {
  cols: 1,
  data: [],
  title: '',
  show: false,
  onChange: () => {},
  defaultValue: '',
  extra: null
};

DrawerPicker.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerPicker, styles);

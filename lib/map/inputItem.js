import React from 'react';
import CSSModules from 'react-css-modules';
import { InputItem } from 'antd-mobile';
import Map from '../map';
import styles from './index.less';
import Scroll from '../scroll';

/**
 * @description MapInputItem
 **/
class MapInputItem extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.defaultValue,
      isSubmit: false
    }
  }

  validate(cb) {
    this.setState({
      isSubmit: true
    }, () => {
      cb && cb();
    })
  }

  submit(cb) {
    if (!this.map) return;
    const position = this.map.getPosition() || {};
    cb && cb(this.state.value, position);
  }

  getLocation() {
    this.map.searchPosition((result) => {
      this.handleChange(result);
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  render() {
    const city = this.props.city;
    const required = this.props.required;
    const title = this.props.title;
    const value = this.state.value;
    const isSubmit = this.state.isSubmit;
    return (
      <div
        className="zp-map-input"
      >
        <InputItem
          value={value}
          placeholder={`请输入${title}`}
          onChange={this.handleChange}
          extra={<div onClick={this.getLocation}>获取当前定位</div>}
          error={isSubmit && required && !value}
        >
          {title}
        </InputItem>
        <Map ref={(ref) => { this.map = ref; }} city={city} address={value} />
      </div>
    );
  }
}

MapInputItem.propTypes = {
  city: React.PropTypes.string,
  title: React.PropTypes.string,
  required: React.PropTypes.bool,
  defaultValue: React.PropTypes.string
};

MapInputItem.defaultProps = {
  city: '中国',
  title: '',
  required: true,
  defaultValue: null
};

export default CSSModules(MapInputItem, styles);

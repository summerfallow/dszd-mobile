import React from 'react';
import CSSModules from 'react-css-modules';
import { Device, Utils } from 'zp-core';
import styles from './index.less';
import Form from './form';
import Group from './group';

/**
 * @description FormList
 * 表单列表
 **/
const FormList = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func
  },
  statics: {
    Group
  },
  getDefaultProps() {
    return {
      data: [],
      onChange: () => {}
    };
  },
  submit(successCallback, errorCallback) {
    this.form.validateFields((error, value) => {
      if (!error) {
        successCallback && successCallback(this.formatValue(value));
      } else {
        this.handleError(error);
        errorCallback && errorCallback(value);
      }
    });
  },
  clear() {
    this.form.resetFields();
  },
  handleError(error) {
    const data = this.props.data;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (error[item.key]) {
        Device.nativeUI.toast(`${item.title}不能为空`);
        return;
      }
    }
  },
  formatValue(value) {
    const newValue = {};
    const data = this.props.data;

    data.forEach((item) => {
      const key = item.key;
      const type = item.type;
      const formatDate = item.formatDate;

      if (value[key] === null || value[key] === undefined) return;

      if (type === 'date' || type === 'time' || type === 'dateTime') {
        if (formatDate) {
          newValue[key] = Utils.dateFormat(value[key].toDate(), formatDate);
        } else {
          newValue[key] = value[key];
        }
      } else if (type === 'picker') {
        newValue[key] = value[key][0];
      } else {
        newValue[key] = value[key];
      }

      if (item.format) {
        newValue[key] = item.format(value[key]);
      }
    });

    return newValue;
  },
  render() {
    const data = this.props.data;

    return (
      <div styleName="form-list">
        <Form data={data} onChange={this.props.onChange} ref={(ref) => { this.form = ref; }} />
      </div>
    );
  }
});

export default CSSModules(FormList, styles);

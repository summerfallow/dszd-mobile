import React from 'react';
import Moment from 'moment';
import { createForm } from 'rc-form';
import { List, InputItem, DatePicker, Switch, Picker, TextareaItem } from 'antd-mobile';
import { Router } from 'zp-core';
import SysData from '../common/sysData';
import Token from './token';

const ListItem = List.Item;

/**
 * @description FormList
 * 表单列表
 **/
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.formatData = this.formatData.bind(this);
    this.formatDataItem = this.formatDataItem.bind(this);
    this.extraMap = {};
    this.fieldsValue = null;
  }
  componentWillUpdate() {
    const value = Object.assign({}, this.props.form.getFieldsValue());
    this.props.onChange(value);
    // if (!Utils.isSame(this.fieldsValue, value)) {
    //   this.props.onChange(value);
    // }
    // this.fieldsValue = value;
  }

  formatData() {
    const data = [];
    this.props.data.forEach((item) => {
      const dataItem = this.formatDataItem(item);
      if (dataItem.visible) {
        data.push(dataItem);
      }
    });
    return data;
  }

  formatDataItem(item) {
    const temp = {
      key: '',
      defaultValue: '',
      editable: true, // 是否可编辑
      disabled: false, // 是否禁用
      placeholder: '', // 提示文字
      error: true, // 出错样式
      required: true, // 是否必填,
      icon: false, // 图标
      /**
       * 表单输入类型
       * input : 普通输入框
       * bankCard : 银行卡
       * phone : 手机号
       * password : 密码
       * number : 数字
       * date : 日期选择
       * time : 时间选择
       * dateTime : 时间日期选择
       * picker : 选择器
       * switch : 滑动开关
       **/
      type: 'input',
      value: null,
      dataSource: [], // 数据源
      visible: true,
      formatDate: '', // 时间格式
      extra: '',
      props: {}, // 额外参数
      className: null
    };
    const obj = {};

    if (item.dataSource && item.dataSource.length) {
      if (item.dataSource[0].value === '') item.dataSource.splice(0, 1);
    }

    // 格式化默认值
    if (item.value !== undefined && item.value !== null) {
      if (item.type === 'dateTime' || item.type === 'time' || item.type === 'date') {
        obj.value = Moment(item.value);
      }

      if (item.type === 'picker') {
        obj.value = [item.value];
      }
    }

    return Object.assign({}, temp, item, obj);
  }

  renderFormListItem(item) {
    let node = null;
    const { getFieldProps, getFieldError, getFieldValue, setFieldsValue } = this.props.form;
    const type = item.type;
    const key = item.key;
    const title = item.title;
    const required = item.required;
    const icon = item.icon;
    const disabled = item.disabled;
    const value = item.value;
    const editable = item.editable;
    const dataSource = item.dataSource;
    const placeholder = item.placeholder ? item.placeholder : `请输入${title}`;
    const props = item.props;

    const defaultProps = Object.assign({}, {
      disabled,
      editable,
      key
    }, props);

    const tokenProps = Object.assign({}, {
      disabled,
      editable,
      key
    });

    const defaultFieldProps = getFieldProps(key, {
      initialValue: value,
      rules: [
        {required}
      ]
    });

    const switchFieldProps = getFieldProps(key, {
      initialValue: value,
      valuePropName: 'checked',
      rules: [
        {required}
      ]
    });

    const textareaFieldProps = getFieldProps(key, {
      initialValue: value || '',
      rules: [
        {required}
      ]
    });

    switch (type) {
      case 'date':
        node = (
          <DatePicker
            mode="date"
            title="选择日期"
            {...defaultProps}
            {...defaultFieldProps}
          >
            <ListItem arrow="horizontal" error={!!getFieldError(key)}>{title}</ListItem>
          </DatePicker>
        );
        break;
      case 'time':
        node = (
          <DatePicker
            mode="time"
            title="选择时间"
            {...defaultProps}
            {...defaultFieldProps}
          >
            <ListItem arrow="horizontal" error={!!getFieldError(key)}>{title}</ListItem>
          </DatePicker>
        );
        break;
      case 'dateTime':
        node = (
          <DatePicker
            mode="datetime"
            title="选择时间"
            {...defaultProps}
            {...defaultFieldProps}
          >
            <ListItem arrow="horizontal" error={!!getFieldError(key)}>{title}</ListItem>
          </DatePicker>
        );
        break;
      case 'switch':
        node = (
          <ListItem
            key={key}
            extra={<Switch {...switchFieldProps} />}
            error={!!getFieldError(key)}
          >
            {title}
          </ListItem>
        );
        break;
      case 'picker':
        node = (
          <Picker
            data={SysData.handle.getDataSource(dataSource)}
            cols={1}
            {...defaultProps}
            {...defaultFieldProps}
          >
            <ListItem arrow="horizontal" error={!!getFieldError(key)}>{title}</ListItem>
          </Picker>
        );
        break;
      case 'cascader':
        node = (
          <Picker
            data={dataSource}
            {...defaultProps}
            {...defaultFieldProps}
          >
            <ListItem arrow="horizontal" error={!!getFieldError(key)}>{title}</ListItem>
          </Picker>
        );
        break;
      case 'textarea':
        node = (
          <TextareaItem
            title={title}
            placeholder={placeholder}
            rows={5}
            error={!!getFieldError(key)}
            {...defaultProps}
            {...textareaFieldProps}
          />
        );
        break;
      case 'view':
        defaultProps.editable = false;
        node = (
          <InputItem
            className={`am-input-view ${item.className || ''}`}
            extra={
              <div className={`${getFieldError(key) ? 'error' : ''}`}>
                {(getFieldValue(key) && this.extraMap[key]) || item.extra || '请选择'}
                <div className="am-input-extra-icon" />
              </div>
            }
            onExtraClick={() => {
              Router.push(item.url, true, {
                value: getFieldValue(key)
              }, (data) => {
                const pageData = data || [];
                const pageDataItem = pageData[0] || null;

                if (pageDataItem) {
                  this.extraMap[key] = pageDataItem.name;
                  setFieldsValue({
                    [key]: pageDataItem.value
                  });
                }
              });
            }}
            onClick={() => {
              Router.push(item.url, true, {
                value: getFieldValue(key)
              }, (data) => {
                const pageData = data || [];
                const pageDataItem = pageData[0] || null;

                if (pageDataItem) {
                  this.extraMap[key] = pageDataItem.name;
                  setFieldsValue({
                    [key]: pageDataItem.value
                  });
                }
              });
            }}
            {...defaultProps}
            {...defaultFieldProps}
          >
            {title}
          </InputItem>
        );
        break;
      case 'token':
        node = (
          <InputItem
            className="am-input-token"
            type="number"
            placeholder={placeholder}
            error={!!getFieldError(key)}
            extra={<Token {...item.props} />}
            {...tokenProps}
            {...defaultFieldProps}
          >
            {title}
          </InputItem>
        );
        break;
      default:
        node = (
          <InputItem
            className={item.className}
            placeholder={placeholder}
            error={!!getFieldError(key)}
            type={type}
            extra={item.extra}
            {...defaultProps}
            {...defaultFieldProps}
          >
            {icon || title}
          </InputItem>
        );
    }

    return node;
  }


  render() {
    const data = this.formatData(this.props.data);
    return (
      <List>
        {
          data.map(item => this.renderFormListItem(item))
        }
      </List>
    );
  }
}

Form.propTypes = {
  data: React.PropTypes.array,
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

Form.defaultProps = {
  data: [],
  onChange: () => {}
};

export default createForm()(Form);

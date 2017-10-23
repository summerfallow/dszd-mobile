import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import FormList from './formList';

/**
 * @description FormList
 * 表单列表
 **/
class FormListGroup extends React.Component {
  constructor(props) {
    super(props);

    this.value = {};
    this.formList = {};
    this.submit = this.submit.bind(this);
  }

  getFieldsValue() {
    let value = {};
    const keys = Object.keys(this.formList);

    keys.forEach((item) => {
      const itemValue = this.formList[item].form.getFieldsValue();
      value = Object.assign({}, value, itemValue);
    });

    return value;
  }

  submit(successCallback) {
    let data = {};
    let count = 0;
    const keys = Object.keys(this.formList);
    const callback = (value) => {
      data = Object.assign({}, data, value);
      count += 1;

      if (count === keys.length) {
        successCallback && successCallback(data);
      }
    };

    keys.forEach((item) => {
      this.formList[item].submit((value) => {
        callback(value);
      });
    });
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const data = this.props.data;
    const whiteSpace = this.props.whiteSpace;

    return (
      <div className="zp-form-list-group">
        {
          data.map((item, index) => (
            item.length ? (
              <div key={index}>
                <FormList
                  data={item}
                  ref={(ref) => { this.formList[`formList${index}`] = ref; }}
                  onChange={(value) => {
                    this.value = Object.assign({}, this.value, value);
                    this.props.onChange(this.value);
                  }}
                />
                {
                  whiteSpace[index] ? whiteSpace[index] : <WhiteSpace />
                }
              </div>
            ) : null
          ))
        }
      </div>
    );
  }
}

FormListGroup.propTypes = {
  data: React.PropTypes.array,
  whiteSpace: React.PropTypes.array,
  onChange: React.PropTypes.func
};

FormListGroup.defaultProps = {
  data: [],
  whiteSpace: [],
  onChange: () => {}
};

export default CSSModules(FormListGroup, styles);

import React from 'react';
import CSSModules from 'react-css-modules';
import { Picker as AntdPicker } from 'antd-mobile';
import PickerItem from './pickerItem';
import styles from './index.less';

/**
 * @description District
 * 选择
 **/
class District extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: []
    };
  }

  handleChange(value) {
    let item = '';

    if (value[0]) item = value[0];
    if (value[1]) item = value[1];
    if (value[2]) item = value[2];

    this.setState({
      value
    });

    this.props.onChange(item);
  }

  render() {
    const value = this.state.value;
    return (
      <div styleName="picker">
        <AntdPicker
          data={this.props.data}
          value={value}
          extra={this.props.extra}
          cols={3}
          onChange={this.handleChange}
          format={() => {
            let item = '';

            if (value[0] && value[0] !== '不限') item = value[0];
            if (value[1] && value[1] !== '不限') item = value[1];
            if (value[2] && value[2] !== '不限') item = value[2];

            return item || this.props.extra;
          }}
        >
          <PickerItem />
        </AntdPicker>
      </div>
    );
  }
}

District.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func,
  extra: React.PropTypes.string
};

District.defaultProps = {
  onChange: () => {},
  extra: '请选择',
  data: []
};

export default CSSModules(District, styles);

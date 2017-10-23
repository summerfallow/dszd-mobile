import React from 'react';
import CSSModules from 'react-css-modules';
import { Radio } from 'antd-mobile';
import styles from './index.less';

/**
 * @description CardHeader
 **/
class RadioList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedValue: null
    };
  }

  handleChange(item) {
    return () => {
      this.setState({
        selectedValue: item.value
      });

      this.props.onChange(item.value);
    };
  }

  render() {
    const data = this.props.data || [];
    const selectedValue = this.state.selectedValue;

    return (
      <div className="zp-radio-list">
        {
          data.map((item, index) => (
            <Radio
              key={index}
              checked={selectedValue === item.value}
              className={selectedValue === item.value ? 'zp-radio-checked' : ''}
              onChange={this.handleChange(item)}>
              {item.name}
            </Radio>
          ))
        }
      </div>
    );
  }
}

RadioList.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func
};

RadioList.defaultProps = {
  data: null,
  onChange: () => {}
};

export default CSSModules(RadioList, styles);

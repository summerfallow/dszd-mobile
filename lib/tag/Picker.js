import React from 'react';
import CSSModules from 'react-css-modules';
import { Picker } from 'antd-mobile';
import styles from './index.less';

/**
 * @description TagPicker
 * 标签选择器
 **/

class TagPicker extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: []
    };
  }

  getValue() {
    return this.state.value.length === 0 ? null : this.state.value;
  }

  clear() {
    this.setState({
      value: []
    });
  }

  handleChange(value) {
    this.setState({
      value
    });
  }

  render() {
    const data = this.props.data;
    const name = this.props.name;
    const value = this.state.value;

    return (
      <div styleName="tag-group">
        <Picker data={data} value={value} onChange={this.handleChange}>
          <div styleName="tag-group-item">
            <div styleName="tag-group-btn selected">{name}</div>
          </div>
        </Picker>
      </div>
    );
  }
}

TagPicker.propTypes = {
  data: React.PropTypes.array,
  name: React.PropTypes.string
};

TagPicker.defaultProps = {
  data: [],
  name: ''
};

export default CSSModules(TagPicker, styles, {
  allowMultiple: true
});

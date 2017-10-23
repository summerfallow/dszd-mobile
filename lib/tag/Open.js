import React from 'react';
import CSSModules from 'react-css-modules';
import { Router } from 'zp-core';
import styles from './index.less';

/**
 * @description TagOpen
 * 标签打开新窗口
 **/

class TagOPen extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: null
    };
  }

  getValue() {
    const value = this.state.value || [];
    const valueItem = value[0] || null;

    return valueItem === null ? null : valueItem.value;
  }

  clear() {
    this.setState({
      value: null
    });
  }

  handleClick() {
    const url = this.props.url;
    const value = this.state.value || [];
    const valueItem = value[0] || null;
    const defaultValue = valueItem ? [{id: valueItem.value}] : null;

    Router.push(url, true, defaultValue, (data) => {
      this.setState({
        value: data
      });
    });
  }

  render() {
    const name = this.props.name;
    const value = this.state.value || [];
    const valueItem = value[0] || {};

    return (
      <div styleName="tag-group">
        <div styleName="tag-group-item">
          <div styleName="tag-group-btn selected" onClick={this.handleClick}>{name}</div>
        </div>
        {valueItem ? <div styleName="tag-group-info">{valueItem.name}</div> : null}
      </div>
    );
  }
}

TagOPen.propTypes = {
  url: React.PropTypes.string,
  name: React.PropTypes.string
};

TagOPen.defaultProps = {
  url: '',
  name: ''
};

export default CSSModules(TagOPen, styles, {
  allowMultiple: true
});

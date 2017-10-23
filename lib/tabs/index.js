import React from 'react';
import CSSModules from 'react-css-modules';
import Pane from './pane';
import styles from './index.less';

const cloneElement = React.cloneElement;

/**
 * @description Tabs
 * 便签栏
 **/
const Tabs = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    defaultSelected: React.PropTypes.number,
    children: React.PropTypes.node
  },
  statics: {
    Pane
  },
  getDefaultProps() {
    return {
      data: [],
      onChange: () => {},
      defaultSelected: 0,
      children: null
    };
  },
  getInitialState() {
    return {
      selected: this.props.defaultSelected
    };
  },
  render() {
    const children = this.props.children;
    const selected = this.state.selected;

    return (
      <div className="zp-tab">
        <div className="zp-tab-nav">
          {
            React.Children.map(children, (item, index) => (
              <div
                key={index}
                onClick={() => {
                  this.setState({
                    selected: index
                  });
                  this.props.onChange(index);
                }}
                className={`zp-tab-nav-item ${selected === index ? 'selected' : ''}`}
              >
                {item.props.tab}
              </div>
            ))
          }
        </div>
        <div className="zp-tab-content">
          {
            React.Children.map(children, (item, index) => cloneElement(item, {selected: selected === index}))
          }
        </div>
      </div>
    );
  }
});

export default CSSModules(Tabs, styles, {
  allowMultiple: true
});

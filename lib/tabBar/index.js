import React from 'react';
import CSSModules from 'react-css-modules';
import Content from './content';
import styles from './index.less';

/**
 * @description TabBar
 * 便签栏
 **/
const TabBar = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
    selected: React.PropTypes.number,
    defaultSelected: React.PropTypes.number

  },
  statics: {
    Content
  },
  getDefaultProps() {
    return {
      data: [],
      onChange: () => {},
      defaultSelected: 0,
      selected: null
    };
  },
  getInitialState() {
    return {
      selected: this.props.defaultSelected
    };
  },
  render() {
    const data = this.props.data;
    const selected = this.props.selected === null ? this.state.selected : this.props.selected;

    return (
      <div className="zp-tab-bar">
        {
          data.map((item, index) => (
            <div
              key={index}
              className="tab-bar-item"
              onClick={() => {
                this.setState({
                  selected: index
                }, () => {
                  this.props.onChange && this.props.onChange(index);
                });
              }}
            >
              <i style={{backgroundImage: `url(${selected === index ? item.selectedIcon : item.icon})`}} />
              <span className={selected === index ? 'cur' : ''}>{item.title}</span>
            </div>
          ))
        }
      </div>
    );
  }
});

export default CSSModules(TabBar, styles, {
  allowMultiple: true
});

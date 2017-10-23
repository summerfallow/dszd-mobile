import React from 'react';
import CSSModules from 'react-css-modules';
import Bar from './bar';
import styles from './index.less';

/**
 * @description SideBar
 * 选择
 **/

class SideBar extends React.Component {
  render() {
    const data = this.props.data;
    const defaultValue = this.props.defaultValue;
    const onChange = this.props.onChange;
    return (
      <div className="zp-side-bar">
        <Bar defaultValue={defaultValue} data={data} onChange={onChange}/>
        <div className="zp-side-bar-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  children: React.PropTypes.node,
  data: React.PropTypes.array,
  defaultValue: React.PropTypes.any,
  onChange: React.PropTypes.func
};

SideBar.defaultProps = {
  children: null,
  dara: [],
  defaultValue: null,
  onChange: () => {}
};

export default CSSModules(SideBar, styles, {
  allowMultiple: true
});

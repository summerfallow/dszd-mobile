import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Icon
 * 选择
 **/

class SelectAction extends React.Component {
  render() {
    return (
      <div className="select-action">
        {this.props.children}
      </div>
    );
  }
}

SelectAction.propTypes = {
  children: React.PropTypes.node
};

SelectAction.defaultProps = {
  children: null
};

export default CSSModules(SelectAction, styles, {
  allowMultiple: true
});

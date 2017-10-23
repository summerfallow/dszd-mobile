import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Skeleton
 * 主模块
 **/

class Skeleton extends React.Component {
  render() {
    const value = this.props.value;
    const size = this.props.size;
    return (value === undefined || value === null) ? (
      <span className={`zp-skeleton skeleton-${size}`}>--</span>
    ) : this.props.children;
  }
}

Skeleton.propTypes = {
  children: React.PropTypes.element,
  value: React.PropTypes.any,
  size: React.PropTypes.string,
};

Skeleton.defaultProps = {
  children: null,
  value: null,
  size: 'middle' // small, middle, large
};

export default CSSModules(Skeleton, styles);

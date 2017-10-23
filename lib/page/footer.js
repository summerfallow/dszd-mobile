import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description PageFooter
 **/
class PageFooter extends React.Component {
  render() {
    return (
      <div
        className="zp-page-footer"
        ref={(ref) => { this.footer = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}

PageFooter.propTypes = {
  children: React.PropTypes.node
};

export default CSSModules(PageFooter, styles);

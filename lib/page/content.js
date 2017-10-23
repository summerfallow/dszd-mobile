import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import Scroll from '../scroll';

/**
 * @description PageContent
 **/
class PageContent extends React.Component {
  render() {
    return (
      <div
        className="zp-page-content"
        ref={(ref) => { this.content = ref; }}
        style={this.props.style}
      >
        {this.props.scroll ? <Scroll scrollName="pageContent">{this.props.children}</Scroll> : this.props.children}
      </div>
    );
  }
}

PageContent.propTypes = {
  children: React.PropTypes.node,
  scroll: React.PropTypes.bool,
  style: React.PropTypes.object
};

PageContent.defaultProps = {
  scroll: true,
  style: {}
};

export default CSSModules(PageContent, styles);

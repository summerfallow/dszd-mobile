import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

const $ = window.jQuery;

/**
 * @description Fixed
 * 悬浮框
 **/

class Fixed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true
    };
  }

  componentDidMount() {
    const $fixed = $(this.fixed);

    $fixed.height($fixed.height());
    $fixed.addClass('fixed-item');
  }

  render() {
    return (
      <div ref={(ref) => { this.fixed = ref; }}>{this.props.children}</div>
    );
  }
}

Fixed.propTypes = {
  children: React.PropTypes.node
};

export default CSSModules(Fixed, styles, {
  allowMultiple: true
});

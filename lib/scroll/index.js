import React from 'react';
import CSSModules from 'react-css-modules';
import { History } from 'zp-core';
import styles from './index.less';

const $ = window.jQuery;
/**
 * @description Scroll
 * 滚动区域
 **/
class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.scrollName = `${this.props.scrollName}`;
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollPosition = this.scrollPosition.bind(this);
    this.state = {
      loaded: true
    };
  }

  componentWillMount() {
    this.current = History.getCurrent();
  }

  componentDidMount() {
    const scroll = this.current[this.scrollName] || {};
    const scrollTop = scroll.scrollTop || 0;
    const scrollLeft = scroll.scrollLeft || 0;

    if (this.scroll && this.current[this.scrollName]) {
      this.scroll.scrollTop = scrollTop;
      this.scroll.scrollLeft = scrollLeft;
    }

    this.scroll.addEventListener('scroll', () => {
      this.props.onScroll(this.scrollPosition());
    }, false);

    $(this.scroll).addClass('loaded');
  }

  componentWillUnmount() {
    if (this.scroll) {
      this.current[this.scrollName] = Object.assign({}, {
        scrollTop: this.scroll.scrollTop,
        scrollLeft: this.scroll.scrollLeft
      });
      History.setItem(this.current, this.scrollName);
      // console.log(this.scrollName, '销毁', this.scroll.scrollTop, this.scroll.scrollLeft);
    }
  }

  scrollTo(top = 0, left = 0, animate = 2000, callback) {
    $(this.scroll).animate({
      scrollTop: top,
      scrollLeft: left
    }, animate, () => {
      callback && callback();
    });
  }

  scrollPosition() {
    const scroll = this.scroll || {};
    const scrollTop = scroll.scrollTop || 0;
    const scrollLeft = scroll.scrollLeft || 0;
    return {
      top: scrollTop,
      left: scrollLeft
    };
  }

  render() {
    return (
      <div className="zp-scroll" ref={(ref) => { this.scroll = ref; }}>
        <div className="zp-scroll-wrap" />
        <div className="zp-scroll-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Scroll.propTypes = {
  children: React.PropTypes.node,
  scrollName: React.PropTypes.string,
  onScroll: React.PropTypes.func
};

Scroll.defaultProps = {
  children: null,
  scrollName: 'scroll',
  onScroll: () => {}
};

export default CSSModules(Scroll, styles, {
  allowMultiple: true
});

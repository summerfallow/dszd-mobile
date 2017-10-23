import React from 'react';
import CSSModules from 'react-css-modules';
import { History } from 'zp-core';
import styles from './index.less';
import Header from './header';
import Content from './content';
import Footer from './footer';

/**
 * @description APP
 **/
const Page = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    store: React.PropTypes.object,
    className: React.PropTypes.string
  },
  contextTypes: {
    store: React.PropTypes.object
  },
  statics: {
    Header,
    Content,
    Footer
  },
  getDefaultProps() {
    return {
      store: null,
      className: '',
      ctrl: null
    };
  },
  getInitialState() {
    const state = this.context.store.getState();
    const key = state.routing.locationBeforeTransitions.key;

    this.historyCurrent = Object.assign({}, History.getCurrent(), {
      key
    });

    // 保存History
    History.setItem(this.historyCurrent);

    return null;
  },

  componentWillUnmount() {
    this.historyCurrent.page = Object.assign({}, this.props.store);
    History.setItem(this.historyCurrent, 'page');
  },

  render() {
    return (
      <div className={`zp-page fluid ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
});

export default CSSModules(Page, styles);

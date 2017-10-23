import React from 'react';
import CSSModules from 'react-css-modules';
import Header from './header';
import styles from './index.less';

/**
 * @description Card
 **/
const Card = React.createClass({
  propTypes: {
    title: React.PropTypes.any,
    extra: React.PropTypes.any,
    ctrl: React.PropTypes.bool,
    defaultActive: React.PropTypes.bool,
    children: React.PropTypes.node
  },
  statics: {
    Header
  },
  getDefaultProps() {
    return {
      title: null,
      extra: null,
      ctrl: false,
      defaultActive: true,
      children: null
    };
  },
  getInitialState() {
    return {
      active: this.props.defaultActive
    };
  },
  componentDidMount() {

  },
  render() {
    const title = this.props.title;
    const extra = this.props.extra;
    const ctrl = this.props.ctrl;
    const active = this.state.active;
    return (
      <div className="zp-card">
        <Header
          title={title}
          extra={extra}
          ctrl={ctrl}
          active={active}
          onCtrlClick={() => {
            if (!ctrl) return;
            this.setState({
              active: !active
            });
          }}
        />
        <div className="card-content">
          <div>{active && this.props.children}</div>
        </div>
      </div>
    );
  }
});

export default CSSModules(Card, styles, {
  allowMultiple: true
});

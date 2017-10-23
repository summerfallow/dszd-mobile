import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description TabsPane
 * TabPane
 **/
class TabsPane extends React.Component {
  render() {
    const selected = this.props.selected;

    return (
      <div className={`zp-tab-pane ${selected ? 'selected' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

TabsPane.propTypes = {
  children: React.PropTypes.node,
  selected: React.PropTypes.bool
};

TabsPane.defaultProps = {
  children: null,
  selected: false
};

export default CSSModules(TabsPane, styles, {
  allowMultiple: true
});

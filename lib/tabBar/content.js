import React from 'react';
import CSSModules from 'react-css-modules';
import Scroll from '../scroll';
import styles from './index.less';

/**
 * @description TabBarContent
 * TabBarContent
 **/
class TabBarContent extends React.Component {
  render() {
    const data = this.props.data;
    const selected = this.props.selected;

    return (
      <div className="zp-tab-bar-content">
        {
          data.map((item, index) => (
            <div
              key={index}
              className={`tab-bar-content ${selected === index ? 'cur' : ''}`}
            >
              {
                item.scroll === false ? item.render : (
                    <Scroll scrollName={`tabContent${index}`}>{item.render}</Scroll>
                )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

TabBarContent.propTypes = {
  data: React.PropTypes.array,
  selected: React.PropTypes.number
};

TabBarContent.defaultProps = {
  data: [],
  selected: 0
};

export default CSSModules(TabBarContent, styles, {
  allowMultiple: true
});

import React from 'react';
import { Tabs } from 'antd-mobile';
import CSSModules from 'react-css-modules';
import Video from './video';
import styles from './index.less';

const TabPane = Tabs.TabPane;
/**
 * @description VideoTabs
 **/

class VideoTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.vidoe = {};
  }

  handleChange(index) {
    const id = index[index.length - 1];
    const keys = Object.keys(this.vidoe);

    keys.forEach((name) => {
      if (id !== name) this.vidoe[name].pause();
    });

    this.props.onChange(index);
  }

  render() {
    const data = this.props.data || [];

    return (
      <div className="zp-video-tabs">
        <Tabs onChange={this.handleChange} andmit={false}>
          {
            data.map((item, index) => (
              <TabPane tab={item.title} key={index}>
                {
                  item.src && <Video src={item.src} ref={(ref) => { this.vidoe[index.toString()] = ref; }} />
                }
              </TabPane>
            ))
          }
        </Tabs>
      </div>
    );
  }
}

VideoTabs.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func
};

VideoTabs.defaultProps = {
  data: [],
  onChange: () => {}
};

export default CSSModules(VideoTabs, styles);

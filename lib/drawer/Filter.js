import React from 'react';
import CSSModules from 'react-css-modules';
import { Button, Flex} from 'antd-mobile';
import styles from './index.less';

const cloneElement = React.cloneElement;
const FlexItem = Flex.Item;

/**
 * @description DrawerFilter
 * 抽屉-筛选
 **/
class DrawerFilter extends React.Component {
  constructor(props) {
    super(props);
    this.getTagSelectKey = this.getTagSelectKey.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.tagSelect = {};
  }

  getTagSelectKey() {
    const keys = Object.keys(this.tagSelect);
    const data = {};

    keys.forEach((item) => {
      const tagSelect = this.tagSelect[item];
      const value = tagSelect.getValue();

      if (value !== null) data[item] = value;
    });

    return data;
  }

  handleClear() {
    const keys = Object.keys(this.tagSelect);

    keys.forEach((item) => {
      const tagSelect = this.tagSelect[item];
      tagSelect.clear();
    });
  }

  handleOk() {
    const data = this.getTagSelectKey();
    this.context.hideDrawer();
    this.props.onChange(data);
  }

  render() {
    const data = this.props.data;

    return (
      <div className="drawer-filter drawer-group-item">
        <div className="drawer-filter-content">
          {
            data.map((item, index) =>
              <div className="drawer-filter-item" key={index}>
                {item.title ? <div className="drawer-filter-item-title">{item.title}</div> : null}
                {
                  cloneElement(item.render(), {
                    ref: (ref) => {
                      this.tagSelect[item.key] = ref;
                    }
                  })
                }
              </div>
            )
          }
        </div>
        <Flex className="drawer-filter-btn">
          <FlexItem><Button onClick={this.handleClear}>重置</Button></FlexItem>
          <FlexItem><Button type="primary" onClick={this.handleOk}>完成</Button></FlexItem>
        </Flex>
      </div>
    );
  }
}

DrawerFilter.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

DrawerFilter.defaultProps = {
  data: [],
  onChange: () => {}
};

DrawerFilter.contextTypes = {
  showDrawer: React.PropTypes.func,
  hideDrawer: React.PropTypes.func
};

export default CSSModules(DrawerFilter, styles);

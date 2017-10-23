import React from 'react';
import CSSModules from 'react-css-modules';
import { Popup, List } from 'antd-mobile';
import styles from './index.less';

const ListItem = List.Item;

/**
 * @description PopoverSort
 * 弹出层-排序
 **/
class PopoverSort extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.state = {
      selected: null,
      selectedTitle: ''
    };
  }

  handleClick() {
    Popup.show(this.renderPopup(), {
      style: {test: 0}
    });
  }

  handleSelectItem(item) {
    this.setState({
      selected: item.value,
      selectedTitle: item.name
    }, () => {
      this.props.onChange(item.value);
    });
  }

  renderPopup() {
    const data = this.props.data;
    const selected = this.state.selected;

    return (
      <div className="popup-sort">
        <List>
          {
            data.map((item, index) => {
              const className = selected === item.value ? 'sort-selected' : '';
              return (
                <ListItem
                  key={index}
                  onClick={() => this.handleSelectItem(item)}
                >
                  <span className={className}>{item.name}</span>
                </ListItem>
              );
            })
          }
        </List>
      </div>
    );
  }

  render() {
    return <div onClick={this.handleClick}>{this.props.children}</div>;
  }
}

PopoverSort.propTypes = {
  data: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  children: React.PropTypes.node
};

PopoverSort.defaultProps = {
  data: [],
  onChange: () => {},
  children: null
};

export default CSSModules(PopoverSort, styles);

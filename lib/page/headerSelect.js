import React from 'react';
import CSSModules from 'react-css-modules';
import { List } from 'antd-mobile';
import { Device } from 'zp-core';
import styles from './index.less';

const ListItem = List.Item;
const $ = window.jQuery;

/**
 * @description PageHeaderSelect
 **/
class PageHeaderSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      visible: false,
      selected: this.props.defaultValue
    };
  }

  componentDidMount() {
    if (Device.navigator.isImmersedStatusbar()) {
      const height = Device.navigator.getStatusbarHeight();
      $(this.selectBody).css({
        top: $('.am-navbar').height() + height,
      });
    }
  }

  handleClick() {
    const visible = this.state.visible;
    this.setState({
      visible: !visible
    });
  }

  handleSelect(item, index) {
    this.setState({
      selected: index
    });
    this.props.onChange(item.value);
    this.handleClick();
  }

  render() {
    const visible = this.state.visible;
    const data = this.props.data;
    const selected = this.state.selected;
    const title = selected ? data[selected].name : this.props.title;

    return (
      <div
        styleName="page-header-select"
      >
        <div onClick={this.handleClick} styleName="select-title"><p>{title}</p><span styleName={visible ? 'up' : ''} /></div>
        <div
          styleName={`select-body ${visible ? 'show' : ''}`}
          onClick={this.handleClick}
          ref={(ref) => { this.selectBody = ref; }}
        >
          <div styleName={`select-mask ${visible ? 'show' : ''}`}/>
          <div styleName="select-content">
            <List>
              {
                data.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => this.handleSelect(item, index)}>
                    <span styleName={selected === index ? 'selected' : ''}>{item.name}</span>
                  </ListItem>
                ))
              }
            </List>
          </div>
        </div>
      </div>
    );
  }
}

PageHeaderSelect.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
  onChange: React.PropTypes.func,
  defaultValue: React.PropTypes.number
};

PageHeaderSelect.defaultProps = {
  title: '',
  data: [],
  onChange: () => {},
  defaultValue: 0
};

export default CSSModules(PageHeaderSelect, styles, {
  allowMultiple: true
});

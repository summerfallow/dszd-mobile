import React from 'react';
import CSSModules from 'react-css-modules';
import { SearchBar as AntdSearchBar } from 'antd-mobile';
import { Device } from 'zp-core';
import Image from '../image';
import styles from './index.less';

const $ = window.jQuery;

/**
 * @description TagPicker
 * 标签选择器
 **/

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: this.props.defaultValue,
      show: false,
      selectIndex: 0,
      focused: this.props.focused
    };
  }

  componentDidMount() {
    const immersed = this.props.immersed;
    if (Device.navigator.isImmersedStatusbar() && immersed) {
      const height = Device.navigator.getStatusbarHeight();
      $(this.searchBar).css({
        paddingTop: height,
        boxSizing: 'content-box'
      });
    }
  }

  handleChange(value) {
    this.setState({
      value
    });

    this.props.onChange(value);
  }

  handleSubmit(value) {
    const selectIndex = this.state.selectIndex;
    // const selectItem = this.props.selectData[selectIndex] || {};

    this.props.onSubmit(value, selectIndex);
  }

  handleCancel() {
    this.setState({
      value: ''
    });

    if (this.props.cancelSubmit) {
      this.props.onSubmit('');
    }

    this.props.onCancel();
  }

  handleFocus() {
    this.props.onFocus();
  }

  handleBlur() {
    if (this.state.focused) {
      this.setState({
        focused: false
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    const value = this.state.value;
    const placeholder = this.props.placeholder;
    const select = this.props.select;
    const show = this.state.show;
    const selectData = this.props.selectData;
    const selectIndex = this.state.selectIndex;

    return (
      <div
        className="zp-search-bar"
        styleName={`${select ? 'select' : ''} ${show ? 'show' : ''}`}
        ref={(ref) => { this.searchBar = ref; }}
      >
        {this.props.children ? <div styleName="search-bar-content">{this.props.children}</div> : null}
        <div styleName="search-bar-input" onClick={this.handleClick}>
          <AntdSearchBar
            value={value}
            placeholder={placeholder}
            autoFocus={this.props.autoFocus}
            focused={this.state.focused}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        {
          select && (
            <div styleName="select-wrap">
              <div
                styleName="select-value"
                onClick={() => {
                  this.setState({
                    show: true
                  });
                }}
              >
                {selectData[selectIndex].name}
              </div>
              <div styleName="select-icon" />
            </div>
          )
        }
        {
          select && (
            <div
              styleName="mask"
              onClick={() => {
                this.setState({
                  show: false
                });
              }}
            />
          )
        }
        {
          select && (
            <div styleName="select-content">
              <ul>
                {
                  this.props.selectData.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        this.setState({
                          show: false,
                          selectIndex: index
                        });
                      }}
                    >
                      {item.icon ? <Image background={item.icon}/> : null}
                      <span>{item.name}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

SearchBar.propTypes = {
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  immersed: React.PropTypes.bool,
  select: React.PropTypes.bool,
  selectData: React.PropTypes.array,
  defaultValue: React.PropTypes.string,
  cancelSubmit: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  focused: React.PropTypes.bool,
  children: React.PropTypes.node
};

SearchBar.defaultProps = {
  onClick: () => {},
  onSubmit: () => {},
  onChange: () => {},
  onCancel: () => {},
  onFocus: () => {},
  placeholder: '',
  immersed: false, // 沉浸式导航栏
  select: false,
  selectData: [],
  defaultValue: '',
  cancelSubmit: true,
  autoFocus: false,
  focused: false,
  children: null
};

export default CSSModules(SearchBar, styles, {
  allowMultiple: true
});

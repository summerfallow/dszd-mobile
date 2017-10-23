import React from 'react';
import CSSModules from 'react-css-modules';
import { NavBar } from 'antd-mobile';
import { Device, Router, History, Analytics } from 'zp-core';
import styles from './index.less';

const $ = window.jQuery;

/**
 * @description PageHeader
 **/
class PageHeader extends React.Component {
  componentWillMount() {
    this.setTitle(this.props.title);
    // 埋点统计
    // TalkingData.pageShow(this.props.title, this.props.talkingDataQuery);
    Analytics.track('pageShow', Object.assign({}, {
      pageName: this.props.title
    }, this.props.analyticsDataQuery));
    //
    this.historyCurrent = History.getCurrent();
    this.historyCurrent.title = this.props.title;
    History.setItem(this.historyCurrent, 'title');
  }

  componentDidMount() {
    this.immersedStatusbar();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setTitle(nextProps.title);
    }
  }

  componentDidUpdate() {
    this.immersedStatusbar();
  }

  setTitle(title) {
    // for android
    document.title = title;
    // console.log('设置标题:',_title);
    // for ios
    // IOS微信浏览器首次加载页面初始化title后，就再也不监听 document.title的change事件，
    // 动态创建一个iframe加载图片，实现一次加载，可让浏览器强制刷新
    // const i = document.createElement('iframe');
    // i.src = Pic;
    // i.style.display = 'none';
    // i.onload = () => {
    //   setTimeout(() => {
    //     i.remove();
    //   }, 0);
    // };
    // document.body.appendChild(i);
  }

  immersedStatusbar() {
    if (Device.navigator.isImmersedStatusbar()) {
      const height = Device.navigator.getStatusbarHeight();
      $(this.header).find('.am-navbar').css({
        paddingTop: height,
        boxSizing: 'content-box'
      });
    }
  }

  render() {
    const iconName = this.props.iconName;
    const canBack = this.props.canBack;
    return (
        <div
          className="zp-page-header"
          ref={(ref) => { this.header = ref; }}
        >
          {
            this.props.navBar && (
              <NavBar
                iconName={canBack ? iconName : null}
                leftContent={canBack ? this.props.leftContent : null}
                rightContent={this.props.rightContent || <div className="navbar-none">无</div>}
                onLeftClick={() => {
                  if (!canBack) return;
                  Router.goBack();
                }}
              >
                { this.props.title }
              </NavBar>
            )
          }
          {this.props.children}
        </div>
    );
  }
}

PageHeader.propTypes = {
  navBar: React.PropTypes.bool,
  leftContent: React.PropTypes.any,
  rightContent: React.PropTypes.any,
  title: React.PropTypes.node.isRequired,
  children: React.PropTypes.node,
  iconName: React.PropTypes.any,
  canBack: React.PropTypes.bool,
  analyticsDataQuery: React.PropTypes.object
};

PageHeader.defaultProps = {
  leftContent: '返回',
  rightContent: null,
  navBar: true,
  title: null,
  iconName: 'left',
  canBack: true,
  analyticsDataQuery: null
};

export default CSSModules(PageHeader, styles);

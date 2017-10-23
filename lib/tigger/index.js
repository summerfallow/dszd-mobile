/**
 * Created by YMM on 16/7/28.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Utils } from 'zp-core';
//组件
const cloneElement = React.cloneElement;

/**
 * @description 后台登录
 **/
var Trigger = React.createClass({
    count : Utils.getUUID(),
    getDefaultProps() {
        return {
            onClick : null,
            popup : null
        };
    },
    // 完成初始渲染
    componentDidMount() {
        this.renderPopup();
    },
    // 完成更新渲染
    componentDidUpdate() {
        this.renderPopup();
    },
    render() {
        const props = this.props;
        const children = props.children;
        const child = React.Children.only(children);
        const newChildProps = {};

        if(this.props.onClick) newChildProps.onClick = this.props.onClick;

        return cloneElement(child, newChildProps);
    },
    renderPopup() {
        if (!this.popupWrap) {
            this.createPopupWrapper();
        }

        let popup = this.props.popup;

        if (popup !== null) {
            //console.log('渲染', this.props.popup.props.title);
            this.popupInstance = ReactDOM.render(popup, this.popupWrap);
        }
        else {
            this.unmountOverlay();
        }
    },
    // 将要移出真实 DOM
    componentWillUnmount() {
        //console.log(this.props.popup);
        //console.log('移除DOM', this.props.title, this.props.popup);

        this.unmountOverlay();

        if (this.popupWrap) {
            this.getContainerDOMNode().removeChild(this.popupWrap);
            this.popupWrap = null;
        }
    },
    // 移除Overlay
    unmountOverlay() {
        //console.log('移除Overlay', this.props.title);
        ReactDOM.unmountComponentAtNode(this.popupWrap);
        this.popupInstance = null;
    },
    createPopupWrapper() {
        this.count = Utils.getUUID();
        this.popupWrap = this.getContainerDOMNode().appendChild(document.createElement('div'));
    },
    getContainerDOMNode() {
        return document.getElementById('root');
    },
    getPopupDOMNode() {
        if (this.popupInstance) {
            return ReactDOM.findDOMNode(this.popupInstance);
        }

        return null;
    }
});

export default Trigger;


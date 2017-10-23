import React from 'react';

const PhotoSwipe = window.PhotoSwipe;
const PhotoSwipeUIDefault = window.PhotoSwipeUI_Default;
/**
 * @description 图片
 * @param {Str} src 路径
 * @param {Str} defaultSrc 默认路径
 * @param {Str} className 样式名
 * @param {bool} layzload 懒加载
 * @param {bool} background 用背景显示
 **/
class Gallery extends React.Component {
  show(src) {
    const pswpElement = this.gallery;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const items = [{
        src,
        w: img.width,
        h: img.height
      }];
      const options = {
        index: 0
      };
      const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options);
      gallery.init();
    };
  }
  render() {
    return (
      <div ref={(refs) => { this.gallery = refs; }} className="pswp" tabIndex="-1" role="dialog" ariaHidden="true">
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button className="pswp__button pswp__button--close" title="Close (Esc)" />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;

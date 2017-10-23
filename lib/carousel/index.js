import React from 'react';
import CSSModules from 'react-css-modules';
import { Carousel as AntdCarousel } from 'antd-mobile';
import { Router } from 'zp-core';
import Image from '../image';
import Video from '../video';
import styles from './index.less';

/**
 * @description Carousel
 * 表单提交按钮
 **/

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.vidoe = {};
  }

  handleChange(index) {
    const id = index;
    const keys = Object.keys(this.vidoe);

    keys.forEach((name) => {
      if (id !== name) this.vidoe[name].pause();
    });
  }

  render() {
    const data = this.props.data || [];
    const defaultSrc = this.props.defaultSrc;

    return (
      <div className="zp-carousel">
        <AntdCarousel
          autoplay={false}
          infinite
          afterChange={this.handleChange}
        >
          {
            data.length ? data.map((item, index) => (
              <div key={index}>
                <div
                  className="carousel-item"
                  onClick={() => {
                    if (item.link) {
                      if (item.onClick) item.onClick();
                      if (item.link.indexOf('http') >= 0) window.location.href = item.link;
                      else Router.push(item.link);
                    }
                  }}
                >
                  {
                    item.type === 'image' && <Image background={item.src} />
                  }
                  {
                    item.type === 'video' && <Video src={item.src} className="carousel-item" ref={(ref) => { this.vidoe[index.toString()] = ref; }} />
                  }
                </div>
              </div>
            )) : <div><div className="carousel-item"><Image background={defaultSrc} /></div></div>
          }
        </AntdCarousel>
      </div>
    );
  }
}

Carousel.propTypes = {
  data: React.PropTypes.array,
  defaultSrc: React.PropTypes.string
};

Carousel.defaultProps = {
  data: [],
  defaultSrc: ''
};

export default CSSModules(Carousel, styles, {
  allowMultiple: true
});

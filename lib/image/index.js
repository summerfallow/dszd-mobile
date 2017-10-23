import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Image
 * 图片
 **/

class Image extends React.Component {
  render() {
    const src = this.props.src;
    const className = this.props.className;
    const background = this.props.background;
    const circle = this.props.circle;

    return (
      <div
        className={className}
        styleName={`image ${background ? 'background' : ''} ${circle ? 'circle' : ''}`}
        style={{
          backgroundImage: `url("${background}")`
        }}
      >
        <img
          src={src}
          alt=""
          onLoad={() => this.props.onLoad()}
        />
      </div>
    );
  }
}

Image.propTypes = {
  src: React.PropTypes.string,
  className: React.PropTypes.string,
  background: React.PropTypes.string,
  circle: React.PropTypes.bool,
  onLoad: React.PropTypes.func
};

Image.defaultProps = {
  src: '',
  background: '',
  className: '',
  circle: false,
  onLoad() {}
};

export default CSSModules(Image, styles, {
  allowMultiple: true
});

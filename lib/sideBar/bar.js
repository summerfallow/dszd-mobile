import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description Bar
 * 选择
 **/

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultValue || ''
    };
  }

  render() {
    const data = this.props.data;
    const selected = this.state.selected;
    return (
      <ul className="zp-side-bar-nav">
        {
          data.map((item, index) => (
            <li
              key={index}
              className={item.value === selected ? 'selected' : ''}
              onClick={() => {
                this.setState({
                  selected: item.value
                }, () => {
                  this.props.onChange(item.value);
                });
              }}
            >
              <span>{item.name}</span>
            </li>
          ))
        }
        <li />
      </ul>
    );
  }
}

Bar.propTypes = {
  data: React.PropTypes.array,
  defaultValue: React.PropTypes.any,
  onChange: React.PropTypes.func
};

Bar.defaultProps = {
  dara: [],
  defaultValue: null,
  onChange: () => {}
};

export default CSSModules(Bar, styles, {
  allowMultiple: true
});

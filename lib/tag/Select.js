import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';

/**
 * @description TagSelect
 * 标签选择
 **/

class TagSelect extends React.Component {
  constructor(props) {
    super(props);

    this.clear = this.clear.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selected: ''
    };
  }

  getValue() {
    return this.state.selected === '' ? null : this.state.selected;
  }

  clear() {
    this.setState({
      selected: ''
    });
  }

  handleClick(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    const data = this.props.data;
    const selected = this.state.selected;

    return (
      <div styleName="tag-group">
        {
          data.map((item, index) => {
            const styleName = `tag-group-btn ${item.value === selected ? 'selected' : ''}`;

            return (
              <div key={index} styleName="tag-group-item" onClick={() => this.handleClick(item.value)}>
                <div styleName={styleName}>{item.name}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

TagSelect.propTypes = {
  data: React.PropTypes.array
};

TagSelect.defaultProps = {
  data: []
};

export default CSSModules(TagSelect, styles, {
  allowMultiple: true
});

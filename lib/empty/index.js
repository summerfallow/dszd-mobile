import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import LoadingPic from './images/loading.gif';
import HousePic from './images/house.png';
import PeoplePic from './images/people.png';
import RecordPic from './images/record.png';
import SearchPic from './images/search.png';
import TodoPic from './images/todo.png';

const PicList = {
  loading: LoadingPic,
  house: HousePic,
  people: PeoplePic,
  record: RecordPic,
  search: SearchPic,
  todo: TodoPic
};
/**
 * @description Empty
 * 空数据
 **/

class Empty extends React.Component {
  render() {
    const text = this.props.text || '暂时没有数据';
    const type = this.props.type;
    let node = <div styleName="empty-text">{text}</div>;

    if (type === 'search') {
      if (this.props.text) {
        node = <div styleName="empty-text">未找到与“<span>{text}</span>”相关的结果</div>;
      } else {
        node = <div styleName="empty-text">暂未搜索到相关结果</div>;
      }
    }
    if (type === 'loading') node = <div styleName="empty-text">努力加载中</div>;

    return (
        <div className="zp-empty">
          <div styleName="empty-pic" style={{backgroundImage: `url(${PicList[type]})`}} />
          {node}
        </div>
    );
  }
}

Empty.propTypes = {
  text: React.PropTypes.any,
  type: React.PropTypes.string
};

Empty.defaultProps = {
  text: '',
  type: 'todo'
};

export default CSSModules(Empty, styles, {
  allowMultiple: true
});

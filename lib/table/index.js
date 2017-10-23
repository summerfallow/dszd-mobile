import React from 'react';
import CSSModules from 'react-css-modules';
import Card from '../card';
import Skeleton from '../skeleton';
import styles from './index.less';

const CardHeader = Card.Header;

/**
 * @description TableData
 * 房源详情页内容
 **/

class TableData extends React.Component {
  getValue(value) {
    let result = value;
    if (value === '' || value === null || value === undefined) result = '暂无';
    return result;
  }

  render() {
    const data = this.props.data;
    const title = this.props.title || '';
    const skeletonValue = this.props.skeletonValue;

    return (
      <div className="zp-table">
        {
          title ? <CardHeader title={title} /> : null
        }
        <div className="table-content">
          {
            data.map((row, rowIndex) => (
              <div key={rowIndex} className="table-row">
                {
                  row.map((rowItem, rowItemIndex) => (
                    <div key={rowItemIndex} className={`table-row-item row-${row.length}`}>
                      <div className="table-row-item-name">
                        <Skeleton value={skeletonValue}><span>{rowItem.name}</span></Skeleton>
                        </div>
                      <div className="table-row-item-value">
                        <Skeleton value={skeletonValue} size="large"><span>{this.getValue(rowItem.value)}</span></Skeleton>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

TableData.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
  skeletonValue: React.PropTypes.any
};

TableData.defaultProps = {
  title: null,
  data: null,
  skeletonValue: null
};

export default CSSModules(TableData, styles, {
  allowMultiple: true
});

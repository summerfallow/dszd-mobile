import React from 'react';
import CSSModules from 'react-css-modules';
import themes from './themes';
// 引入ECharts主模块
// import Echarts from 'echarts/lib/echarts';
// 引入饼图
// import EchartsPie from 'echarts/lib/chart/pie';
// import Macarons from 'echarts/theme/macarons';
import styles from './index.less';

/**
 * @description ButtonSubmit
 * 表单提交按钮
 **/

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.echarts = null;
  }

  componentDidMount() {
    // console.log(this.props.options);
    // console.log('图表加载成功', Macarons);
    // 基于准备好的dom，初始化echarts实例
    // Echarts.registerTheme('macarons', Macarons);
    // this.echarts = Echarts.init(this.charts, 'macarons');
  }

  setOption(options) {
    if (!this.echarts) {
      themes.init();
      this.echarts = window.echarts.init(this.charts, 'macarons');
    }
    this.echarts.setOption(options);
  }

  render() {
    return (
      <div
        ref={(ref) => { this.charts = ref; }}
        style={{
          width: '100%',
          height: '3.5rem'
        }}
      />
    );
  }
}

Charts.propTypes = {
  options: React.PropTypes.object
};

Charts.defaultProps = {
  options: null
};

export default CSSModules(Charts, styles, {
  allowMultiple: true
});

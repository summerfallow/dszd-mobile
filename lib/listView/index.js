import React from 'react';
import CSSModules from 'react-css-modules';
import { ListView as AmListView, Toast, RefreshControl } from 'antd-mobile';
import { Connect, History, Utils } from 'zp-core';
import styles from './index.less';
import Empty from '../empty';
import IndexedList from './IndexedList';

const cloneElement = React.cloneElement;

/**
 * @description ListView
 * 长列表
 **/
const ListView = React.createClass({
  propTypes: {
    api: React.PropTypes.number.isRequired,
    dataName: React.PropTypes.string,
    listViewName: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    renderRow: React.PropTypes.func,
    renderSeparator: React.PropTypes.func,
    renderFooter: React.PropTypes.func,
    renderHeader: React.PropTypes.func,
    query: React.PropTypes.object,
    noMoreInfo: React.PropTypes.any,
    empty: React.PropTypes.node,
    refreshControl: React.PropTypes.bool,
    skeletonNum: React.PropTypes.number,
    onLoad: React.PropTypes.func,
    onRefresh: React.PropTypes.func
  },
  statics: {
    IndexedList
  },
  getDefaultProps() {
    return {
      renderHeader: null,
      renderRow: null,
      renderSeparator: null,
      pageSize: 20,
      dataName: 'list',
      listViewName: 'data',
      query: {},
      noMoreInfo: null,
      empty: <Empty />,
      refreshControl: true,
      skeletonNum: 0,
      onLoad: () => {},
      onRefresh: () => {}
    };
  },
  getInitialState() {
    this.listViewName = `${this.props.listViewName}_listView`;
    const dataSource = new AmListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const cache = History.getCurrent()[this.listViewName];
    // console.log('=========', cache);
    this.loaded = false; // 是否从服务端获取过数据,用来判断是否显示占位布局,防止重复初始化
    this.listData = cache ? cache.listData : Utils.getNumbersArray(this.props.skeletonNum).map(() => null);
    this.listGenData = this.genData(this.listData);
    this.end = cache ? cache.end : false;
    this.historyCurrent = null;
    this.listView = null;
    return {
      // dataSource: dataSource.cloneWithRows(this.listGenData),
      dataSource: dataSource.cloneWithRows(this.listGenData),
      isLoading: cache ? cache.isLoading : false,
      refreshing: cache ? cache.refreshing : false,
      pageIndex: cache ? cache.pageIndex : 0,
      initialListSize: cache ? cache.listData.length : this.props.pageSize
    };
  },
  componentWillMount() {
    const cache = History.getCurrent()[this.listViewName];
    // 没有缓存数据才从服务端获取
    if (!cache) {
      this.initData();
    } else if (!Utils.isSame(this.props.query, cache.query)) {
      // 有缓存但是参数发生变化
      // console.log('ListView从缓存里获取数据, 有缓存但是参数发生变化');
      this.initData();
    } else {
      // console.log('ListView从缓存里获取数据', this.props.listViewName);
    }

    this.historyCurrent = History.getCurrent();
  },
  componentDidMount() {
    // 没有缓存数据才从服务端获取
    if (History.getCurrent()[this.listViewName] && this.listView) {
      this.listView.refs.listview.scrollTo(2, History.getCurrent()[this.listViewName].offset);
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!Utils.isSame(this.props.query, nextProps.query)) {
      // console.log('ListView接受到新的参数初始化');
      // console.log(this.listView.refs.listview);
      // 防止重复调用onEndReached
      // this.end = true;
      // 假如列表正在加载数据先缓存参数
      if (this.state.isLoading) this.cacheQuery = nextProps.query;
      this.initData(nextProps.query);
      this.listView.refs.listview.scrollTo(2, 0);
    } else {
      // 刷新数据
      // console.log('ListView刷新列表数据');
      // const date = new Date().getTime();
      // const list = this.listData.map(item => Object.assign({}, item, {
      //   dataUpdateTime: date
      // }));
      // this.listGenData = this.genData(list);
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(this.listGenData)
      // });
    }
  },
  componentWillUnmount() {
    if (this.listView) {
      // 缓存列表数据
      const current = this.historyCurrent;
      current[this.listViewName] = Object.assign({}, {
        listData: this.listData,
        pageIndex: this.state.pageIndex,
        isLoading: this.state.isLoading,
        refreshing: this.state.refreshing,
        // dataSource: this.state.dataSource,
        end: this.end,
        offset: this.listView.refs.listview.scrollProperties.offset,
        query: this.props.query
      });
      History.setItem(current, this.listViewName);
    }
  },
  onEndReached() {
    const isLoading = this.state.isLoading;

    // 没有更多数据了
    if (this.end) return;
    // 正在加载数据
    if (isLoading) return;
    // 还有缓存的参数
    if (this.cacheQuery) return;
    // 正在初始化组件
    if (!this.listData.length) return;

    // console.log('ListView翻页');
    this.getData();
  },
  onRefresh() {
    const refreshing = this.state.refreshing;

    if (!refreshing) {
      // console.log('ListView下拉刷新');
      this.setState({
        refreshing: true
      });
      this.initData();
      this.props.onRefresh();
    }
  },
  getData(pageIndex = this.state.pageIndex, query = this.props.query) {
    const api = this.props.api;
    const isLoading = this.state.isLoading;
    const pageSize = this.props.pageSize;
    const dataName = this.props.dataName;
    const nowIndex = pageIndex + 1;
    const noMoreInfo = this.props.noMoreInfo;
    // 没有更多数据了
    if (this.end) return;
    // 正在加载数据
    if (isLoading) return;
    // console.log('ListView开始加载数据', pageIndex, query);

    this.setState({
      isLoading: true
    });

    Connect.getApi(api, Object.assign({}, query, {
      pageIndex: nowIndex,
      pageSize
    }), null, (json) => {
      // 从服务端获取过数据
      if (!this.loaded) {
        this.loaded = true;
        this.listData = [];
        this.listGenData = [];
      }

      // 格式化数据
      const data = dataName ? Utils.getObjectValue(json, dataName) : json;
      // console.log('ListView加载数据完成');
      // 判断是否是最后一页
      if (data.length < this.props.pageSize) {
        // 当页数大于1且允许提示时才弹出
        if (noMoreInfo && nowIndex > 1) Toast.info(noMoreInfo);
        this.end = true;
      }

      const dataList = data;
      this.listData = [...this.listData, ...dataList];
      this.listGenData = this.genData(this.listData);
      // console.log('ListView加载数据完成');
      this.setState({
        isLoading: false,
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(this.listGenData),
        pageIndex: nowIndex
      }, () => {
        // 存在缓存数据
        if (this.cacheQuery) {
          // console.log('ListView存在缓存的参数刷新列表');
          this.initData(this.cacheQuery);
          this.cacheQuery = null;
        }

        if (pageIndex === 0) {
          this.props.onLoad();
        }
      });
    }, () => {
      this.setState({
        isLoading: false,
        refreshing: false
      });
    });
  },
  genData(list) {
    const dataBlob = {};

    for (let i = 0; i < list.length; i++) {
      dataBlob[`${i}-${Utils.getUUID(4)}`] = list[i];
      // dataBlob[`${i}`] = list[i];
    }
    return dataBlob;
  },
  initData(query = this.props.query) {
    if (this.loaded) {
      this.listData = [];
      this.listGenData = [];
    }
    this.end = false;
    this.getData(0, query);
  },

  listViewName: '',
  cacheQuery: null,
  render() {
    // 列项之间的空隙
    const separator = (sectionID, rowID) => {
      let render = null;
      if (this.props.renderSeparator) {
        render = cloneElement(this.props.renderSeparator(sectionID, rowID), {
          key: rowID
        });
      }
      return render;
    };
    // 列表项
    const row = (rowData, sectionID, rowID) => {
      let render = <div key={rowID} />;
      if (this.props.renderRow) {
        render = cloneElement(this.props.renderRow(rowData, sectionID, rowID), {
          key: rowID
        });
      }
      return render;
    };
    // 底部
    const footer = () => {
      let render = (
        <div style={{ textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>
      );
      if (this.props.renderFooter) {
        render = this.props.renderFooter();
      }
      if (this.end) {
        render = (
          <div style={{ textAlign: 'center' }}>没有更多数据了</div>
        );
      }
      return render;
    };

    const node = (
      <AmListView
        initialListSize={this.state.initialListSize}
        dataSource={this.state.dataSource}
        renderHeader={this.props.renderHeader}
        renderRow={row}
        renderSeparator={separator}
        renderFooter={footer}
        pageSize={this.props.pageSize}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        refreshControl={
          this.props.refreshControl ? (
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          ) : null
        }
        ref={(ref) => { this.listView = ref; }}
      />
    );

    // 假如列表为空而且不是下拉刷新的状态显示空图标
    let empty = null;
    if (!this.listData.length && !this.state.refreshing) {
      empty = this.props.empty;
      // 显示正在加载图标
      if (this.state.isLoading) empty = <Empty type="loading" />;
    }
    // 显示占位布局
    if (this.props.skeletonNum && !this.loaded) {
      empty = null;
    }
    return (
      <div className="zp-listView">
        <div styleName="listView-content" style={{opacity: empty ? 0 : 1}}>{node}</div>
        {empty ? <div styleName="listView-empty">{empty}</div> : null}
      </div>
    );
  }
});

export default CSSModules(ListView, styles);


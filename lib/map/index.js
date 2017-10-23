import React from 'react';
import CSSModules from 'react-css-modules';
import { Utils, Device } from 'zp-core';
import styles from './index.less';

const $ = window.jQuery;
// 百度接口
const BaiDuApi = {
  loaded: false,
  addressConnect: false,
  addressCache: null,
  options: {
    ak: 'KyaNGEAhNxLkAPWE7A4PYNy9zPaZ9iYd', // 百度秘钥
    callback: 'renderReverse',
    output: 'json'
  },
  getAddress(city, address, cb) {
    if (this.addressConnect) {
      this.addressCache = { city, address, cb };
      return;
    }
    this.addressConnect = true;
    // 拼接字符串
    const url = `https://api.map.baidu.com/geocoder/v2/?address=${address}&output=${this.options.output}&ak=${this.options.ak}&callback=BaiDuMaoGetAddressCallback`;
    // 成功回调函数
    window.BaiDuMaoGetAddressCallback = (json) => {
      const result = json.result || {};
      const location = result.location || {};
      // console.log('地址搜索结果', json);
      // const point = new this.BMap.Point(location.lng, location.lat);
      cb && cb({
        lng: location.lng,
        lat: location.lat
      });
      if (this.addressCache) {
        this.getAddress(this.addressCache.city, this.addressCache.address, this.addressCache.cb);
      }
      this.addressConnect = false;
      this.addressCache = null;
    };
    // 访问百度服务器
    $.getScript(url);
  },
  getLocation(lng, lat, cb) {
    $.ajax({
      url: 'https://api.map.baidu.com/geocoder/v2/',
      data: Object.assign({}, this.options, {
        coordtype: 'wgs84ll', // GPS经纬度
        location: `${lat},${lng}`
      }),
      dataType: 'json',
      type: 'POST',
      success: (json) => {
        const result = json.result || {};
        const address = result.formatted_address || ''; // 结构化地址信息
        const regions = result.poiRegions || []; // 命中区域面
        const regionsName = regions.length ? regions[0].name : ''; // 命中区域面名称
        // console.log('百度定位位置', JSON.stringify(regions));
        cb && cb(`${address}${regionsName}`);
      }
    });
  },
  loadMap(cb) {
    // 是否已经加载
    if (this.loaded) {
      cb && cb();
      return;
    }
    // 加载完成回调回调函数
    window.BaiDuMaoLoadedCallback = () => {
      this.loaded = true;
      console.log('加载BaiduMap成功');
      cb && cb();
    };
    // 加载地图
    const script = document.createElement('script');
    script.src = `https://api.map.baidu.com/api?v=2.0&ak=${this.options.ak}&callback=BaiDuMaoLoadedCallback&s=1`;
    document.body.appendChild(script);
  }
};
// 地图组件
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.BMap = null;
    this.MapContent = null;
    this.BLocal = null;
    this.BPoint = null;
    this.BGeocoder = null;
    this.BAddress = null;
    this.BNearby = null;
    this.BCircle = null;
    this.BLabel = {};
    this.BPanorama = null;
    this.nearbyData = null;
    this.initMap = this.initMap.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.searchNearby = this.searchNearby.bind(this);
    this.searchPosition = this.searchPosition.bind(this);
    this.showPanorama = this.showPanorama.bind(this);
    this.hidePanorama = this.hidePanorama.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.translatePoints = this.translatePoints.bind(this);
  }

  componentDidMount() {
    const init = () => {
      this.BMap = window.BMap;
      // 搜索城市
      this.MapContent = new this.BMap.Map(this.map, {enableHighResolution: true});
      // 设初始化地图
      this.MapContent.centerAndZoom(this.props.city);
      // 开启鼠标滚轮缩放功能
      this.MapContent.enableScrollWheelZoom(true);
      // 构造全景控件
      if (this.props.panorama) {
        const panoramaCtrl = new this.BMap.PanoramaControl();
        panoramaCtrl.setOffset(new this.BMap.Size(20, 20));
        this.MapContent.addControl(panoramaCtrl);// 添加全景控件
      }
      // 监听地图加载完成
      this.MapContent.addEventListener('load', () => {
        // console.log('百度地图 load');
        // 搜索地址
        this.initMap();
        this.props.onLoad();
      });
      // 监听设置地图完毕
      this.MapContent.addEventListener('zoomend', () => {
        // console.log('百度地图 zoomend');
      });
    };
    // 百度地图是否初始化
    if (window.BMap) {
      // console.log('百度地图已经初始化');
      init();
    } else {
      BaiDuApi.loadMap(() => {
        init();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.BMap) {
      if (nextProps.city !== this.props.city) {
        this.initMap(nextProps.city, nextProps.address, nextProps.nearby);
      } else if (nextProps.address !== this.props.address) {
        this.searchAddress(nextProps.city, nextProps.address, nextProps.nearby);
      } else if (nextProps.nearby !== this.props.nearby) {
        this.searchNearby(nextProps.nearby);
      }
    }
  }
  // 设置中心点
  setCurrent(point, text) {
    this.addMarker(point, {
      text,
      className: 'position',
      name: 'address',
      zoom: 16,
      zIndex: 99
    });
  }
  // 获取位置
  getPosition() {
    const position = this.MapContent.getCenter() || {};
    return {
      lat: position.lat,
      lng: position.lng
    };
  }
  // 搜索地址
  searchAddress(city, address, nearby) {
    if (!this.BMap) return;
    if (!address) return;
    // 清除地图上的定位覆盖物
    this.MapContent.removeOverlay(this.BLabel.position);
    // // 搜索地址
    BaiDuApi.getAddress(city, address, (location) => {
      const point = new this.BMap.Point(location.lng, location.lat);
      this.addMarker(point, {
        text: address,
        className: 'position',
        name: 'address'
      });
      this.searchNearby(nearby);
    });
  }
  // 搜索周边配套
  searchNearby(nearby) {
    if (!this.BMap) return;
    // if (!this.BAddress) return;
    // const localResult = this.BAddress.getResults();
    // const poi = localResult.getPoi(0);
    const poi = this.MapContent.getCenter();
    // if (!poi) return;
    if (this.nearbyData === nearby) return;
    this.nearbyData = nearby;
    // console.log('搜索配套', nearby, BAddress);
    // 搜索取消显示地址
    // if (BAddress) BAddress.clearResults();
    // 清除已有的配套
    if (this.BNearby) this.BNearby.clearResults();
    // 删除覆盖物
    if (this.BCircle) this.MapContent.removeOverlay(this.BCircle);
    // 创建地图覆盖物
    // if (BAddress) BAddress.clearResults();
    this.BCircle = new this.BMap.Circle(poi, 500, {
      fillColor: '#2491ee',
      fillOpacity: 0.2,
      strokeWeight: 1,
      strokeOpacity: 0.3
    });
    this.MapContent.addOverlay(this.BCircle);
    // 搜索附近配套
    this.BNearby = new this.BMap.LocalSearch(this.MapContent, {
      renderOptions: {
        map: this.MapContent,
        selectFirstResult: false
      }
    });
    this.BNearby.searchNearby(nearby, poi, 500);
  }
  // 地图定位
  searchPosition(cb) {
    if (!this.BMap) return;
    // 百度H5定位
    const geolocation = new this.BMap.Geolocation();
    // 定位成功回调函数
    const positionCallback = (result) => {
      // const address = result.address || {};
      Device.nativeUI.closeWaiting();
      cb && cb(result);
    };
    // 清空当前地址
    cb('');
    // 开始定位
    Device.nativeUI.showWaiting('正在定位中');
    // 清除地图上的所有覆盖物
    // this.MapContent.clearOverlays();
    // 判断是否调用设备的定位系统,否则调用浏览器H5d定位
    if (Device.isPlus()) {
      Device.geolocation.getCurrentPosition(null, (position) => {
        // 获取地理坐标信息
        const codns = position.coords || {};
        // console.log('设备定位位置', JSON.stringify(codns));
        BaiDuApi.getLocation(codns.longitude, codns.latitude, (result) => {
          positionCallback(result);
        });
      });
    } else {
      // 开始获取浏览器位置
      geolocation.getCurrentPosition((result) => {
        const address = result.address || {};
        // 返回完整地址
        const addressResult = address.province + address.city + address.district + address.street;
        positionCallback(addressResult);
      });
    }
  }
  // 展示全景图
  showPanorama(lng, lat, cb) {
    const point = new this.BMap.Point(lng, lat);
    const panoramaService = new this.BMap.PanoramaService();
    // 该地区是否有全景地图
    panoramaService.getPanoramaByLocation(point, 50, (data) => {
      if (data) {
        this.BPanorama = new this.BMap.Panorama(this.map);
        this.BPanorama.setPosition(point);
      }
      cb && cb(data);
    });
  }
  // 隐藏全景图
  hidePanorama() {
    this.BPanorama.hide();
  }
  // 地图初始化
  initMap(city = this.props.city, address = this.props.address, nearby = this.props.nearby) {
    if (!this.BMap) return;
    // 搜索取消显示地址
    if (this.BAddress) this.BAddress.clearResults();
    // 清楚已有的配套
    if (this.BNearby) this.BNearby.clearResults();
    // 删除覆盖物
    if (this.BCircle) this.MapContent.removeOverlay(this.BCircle);
    //
    // if (city) this.searchAddress(address, nearby);
    // else
    // console.log(city, address, nearby);
    // 设初始化城市
    // this.MapContent.centerAndZoom(city);
    // 设初始化地址
    if (address) this.searchAddress(city, address, nearby);
  }
  // 添加位置坐标
  addMarker(points, options) {
    if (!this.BMap) return;
    // 设置中心地点
    // this.MapContent.setCenter(points);
    // 设置缩放中心
    // this.MapContent.setZoom(options.zoom || 13);
    // 设置中心和缩放
    this.MapContent.centerAndZoom(points, options.zoom || 13);
    // 添加地图标签
    this.addLabel(points, options);
  }
  // 添加位置标签
  addLabel(points, options = {}) {
    if (!this.BMap) return;
    const content = `
      <div class="map-label ${options.className ? options.className : ''}">
        <div class="label-name">
          <div class="label-text">${options.text || ''}</div>
          <div class="label-extra">${options.extra || ''}</div>
        </div>
        <div class="label-marker"></div>
      </div>
    `;
    const name = options.name || Utils.getUUID(8);
    const label = new this.BMap.Label(content, {
      position: points,    // 指定文本标注所在的地理位置
    });
    // 创建文本标注对象
    label.setStyle({
      color: '#2491ee',
      fontSize: '12px',
      border: '0px solid #fff',
      background: 'none'
    });
    // 设置zIndex
    label.setZIndex(options.zIndex || 0);
    // 假如以存在就删除
    if (this.BLabel[name]) {
      this.MapContent.removeOverlay(this.BLabel[name]);
      this.BLabel[name] = null;
    }
    // 添加到地图
    this.MapContent.addOverlay(label);
    this.BLabel[name] = label;

  }
  // 删除标签
  removeLabel(name) {
    if (this.BLabel[name]) {
      this.MapContent.removeOverlay(this.BLabel[name]);
    }
  }
  // 翻译坐标列表
  translatePoints(points, cb) {
    if (!this.BMap) return;
    // 格式化坐标点列表
    const pointList = points.map(item => new this.BMap.Point(item.lng, item.lat));
    // 开始转化
    const convertor = new this.BMap.Convertor();
    convertor.translate(pointList, 1, 5, (data) => {
      if (data.status === 0) {
        cb && cb(data.points);
      }
    });
  }

  render() {
    return (
      <div ref={(ref) => { this.map = ref; }} className="zp-map" />
    );
  }
}

Map.propTypes = {
  city: React.PropTypes.string,
  address: React.PropTypes.string,
  nearby: React.PropTypes.string,
  onLoad: React.PropTypes.func,
  panorama: React.PropTypes.bool
};

Map.defaultProps = {
  city: '中国', // 城市
  address: '', // 地址
  nearby: '', // 附近配套
  panorama: false, // 全景
  onLoad: () => {}
};

export default CSSModules(Map, styles);


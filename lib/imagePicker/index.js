import React from 'react';
import CSSModules from 'react-css-modules';
import { Device, Utils } from 'zp-core';
import { ImagePicker as Picker } from 'antd-mobile';
import styles from './index.less';

class ImagePickre extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddImageClick = this.handleAddImageClick.bind(this);
    this.state = {
      files: this.props.defaultValue
    };
  }
  onChange(files) {
    this.setState({
      files
    });
  }
  submit(cb) {
    const files = this.state.files;
    const uploadList = [];
    const submitList = [];
    // 获取上传地址和提交地址
    files.forEach((item) => {
      const fileUrl = item.fileUrl || '';
      const url = item.url || '';
      if (fileUrl) uploadList.push(fileUrl);
      else submitList.push(url.replace(this.props.baseUrl, ''));
    });
    // 判断是否需要上传图片
    if (uploadList.length) {
      // 上传文件列表
      // console.log('imagePicker上传列表', JSON.stringify(uploadList));
      Device.uploader.uploadImageList(`${this.props.baseUrl}${this.props.url}`, uploadList, this.props.query, (item) => {
        // console.log('imagePicker成功列表', JSON.stringify(submitList.concat(item)));
        cb && cb(submitList.concat(item));
      });
    } else {
      cb && cb(submitList);
    }
  }
  handleAddImageClick(e) {
    e.preventDefault();
    // 获取需要上传的文件
    Device.uploader.uploaderActionSheet((list = []) => {
      const files = this.state.files;
      const getUrl = () => {
        const listItem = list.shift();
        const callback = (url, fileUrl) => {
          files.push({
            url,
            fileUrl,
            id: Utils.getUUID(6)
          });

          if (list.length) {
            getUrl();
          } else {
            // 设置显示
            this.setState({
              files
            });
          }
        };
        // 判断图片方向
        Device.gallery.isOrientation(listItem, (rotate) => {
          if (rotate) {
            // 图片发生反转用canvas旋转图片在导出base64
            Device.zip.canvasCompressImage({
              src: listItem,
              width: 240,
              height: 240,
              rotate
            }, (base64) => {
              callback(base64, listItem);
            });
          } else {
            callback(listItem, listItem);
          }
        });
      };
      getUrl();
    });
  }
  render() {
    const { files } = this.state;
    return (
      <div>
        <Picker
          files={files}
          onChange={this.onChange}
          onAddImageClick={this.handleAddImageClick}
        />
      </div>
    );
  }
}

ImagePickre.propTypes = {
  query: React.PropTypes.object,
  defaultValue: React.PropTypes.array,
  baseUrl: React.PropTypes.string,
  url: React.PropTypes.string
};

ImagePickre.defaultProps = {
  query: {},
  defaultValue: [],
  baseUrl: '',
  url: ''
};

export default CSSModules(ImagePickre, styles);

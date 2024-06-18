import 'ant-design-vue/dist/antd.css';
import 'element-plus/dist/index.css';

import '@kunlun/vue-ui-antd/dist/kunlun-vue-ui-antd.css';
import '@kunlun/vue-ui-el/dist/kunlun-vue-ui-el.css';

import 'reflect-metadata';
import { VueOioProvider } from '@kunlun/dependencies';

/**
 * 打开注释看资源应用的母版效果
 * @see https://shushi.yuque.com/yoxz76/oio4/ioiokbx9ga31wfub
 * */
// import './mask'
/**
 * 打开注释看资源应用的布局效果
 * @see https://shushi.yuque.com/yoxz76/oio4/pxwbz7y94o3c3ofv
 * */
// import './layout'
/**
 * 打开注释看资源应用的自定义页面效果
 * @see https://shushi.yuque.com/yoxz76/oio4/wb2gs4g49g2141f5
 * */
// import './view';
/**
 * 打开注释看资源应用的自定义动作效果
 * @see https://shushi.yuque.com/yoxz76/oio4/uzbgovky3s3nsta7
 * */
// import './action';
/**
 * 打开注释看自定义字段效果
 * @see https://shushi.yuque.com/yoxz76/oio4/av6omdbgngdvdfg8
 * */
// import './field';

/**
 * 打开注释看自定义主题效果
 * @see https://shushi.yuque.com/yoxz76/oio4/hwx1ughzddx7seg7
 * */
import { themeName } from './theme'

VueOioProvider(
  {
    http: {
      url: location.origin,
    },
    browser: {
      title: 'Oinone',
      favicon: 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/pamirs/image/default_favicon.ico'
    },
    // theme: [themeName]
  },
  []
);
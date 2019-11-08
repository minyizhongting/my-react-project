import LessPluginFunction from 'less-plugin-functions';
import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  // history: 'hash',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/edit', component: '../pages/edit/index' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'pro-frontend',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  lessLoaderOptions: {
    plugins: [new LessPluginFunction()],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true, 
      pathRewrite: { 
        '^/api' : '' 
      } 
    },
  },
}

export default config;

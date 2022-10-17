# qiankun demo

# 本地开发
复制main里面的env.config-example.js文件为env.config.js
```js
module.exports = {
  reactAppEntry: 'http://localhost:8081/', // 用于配置react-app子应用的本地资源路径
};

```

```bash
#  启动主应用
yarn dev:main
# 启动子应用
yarn dev:app
```

# 打包预览

```bash
yarn build
yarn start
```

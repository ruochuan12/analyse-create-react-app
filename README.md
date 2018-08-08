# analyze-create-react-app
分析`create-react-app`的`webpack`配置

### 1、package.json 配置文件

```
{
  "name": "react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```
从简短的`package.json`来看，`webpack`等配置都不在这里，而是依赖了`react-scripts@1.1.4`。
```
./node_modules/react-scripts/bin/react-scripts.js start
```
未完待续...
'use strict';

// 引入内置path、fs、url模块
const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
// process.cwd() 返回 Node.js 进程当前工作的目录
// fs.realpathSync返回解析的路径
const appDirectory = fs.realpathSync(process.cwd());
// 用于获取绝对路径的函数
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 用户环境信息的PUBLIC_URL
const envPublicUrl = process.env.PUBLIC_URL;

// 路径组合 判断是否需要加 /
function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

// 获取PublicUrl
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
// 获取服务端的路径
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  // url内置模块 parse接收三个参数
  // 比如
  // url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash");
  // 返回值：
  // 没有设置第二个参数为true时，默认是false，query属性为一个字符串类型
  // 如果第二个参数为true query属性为一个对象
  // 第三个参数 slashesDenoteHost <boolean> 如果为 true，则 // 之后至下一个 / 之前的字符串会被解析作为 host。 
  // 例如，//foo/bar 会被解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 false。
  /*
  {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=string',
    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
  }
  */
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
// 导出路径
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};

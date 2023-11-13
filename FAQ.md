# 常见问题

## 官方常见问题列表

[https://www.yuque.com/u34495/mivcfg/gv21wi#mzJR6](https://www.yuque.com/u34495/mivcfg/gv21wi#mzJR6)

## kylin linux-arm64 打包报错

```
⨯ cannot execute  cause=exit status 1
errorOut=/home/admin/.cache/electron-builder/fpm/fpm-1.9.3-2.3.1-linux-x86/lib/ruby/bin/ruby:行6: /home/admin/.cache/electron-builder/fpm/fpm-1.9.3-2.3.1-linux-x86/lib/ruby/bin.real/ruby：无法执行二进制文件: 可执行文件格式错误
```

参考 [https://github.com/jordansissel/fpm/issues/1801#issuecomment-919877499](https://github.com/jordansissel/fpm/issues/1801#issuecomment-919877499)

解决方案：使用系统安装的fpm，而不是在线获取fpm包，fpm 需要 ruby 环境，且版本必须大于1.8.5

步骤：  
1.安装ruby，如果有，可以跳过

```
sudo apt install ruby
```

2.安装fpm，gem是ruby的包管理器，类似nodejs的npm

```
sudo gem install fpm
```

3.设置环境变量  
```
export USE_SYSTEM_FPM=true
```

之后继续执行打包命令 `yarn pak` 进行打包

## 运行项目发生错误

```
2023-04-10 09:23:21,754 INFO 19656 [ee-core:loader] Controller loaded: yourProjectPath/electron/controller
2023-04-10 09:23:21,788 INFO 19656 [ee-core:socket:ipcMain] start ipcMain
2023-04-10 09:23:21,788 INFO 19656 [ee-core:socket:ipcMain] register channels
(node:19656) UnhandledPromiseRejectionWarning: TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
```

原因是 `electron/addon` 中存在没有js文件的空目录

## linux下运行package.json某些命令报错
如：
```
> efile-batch-import-client@0.0.1 rd
> ee-core rd --dist_dir=./frontend/dist

/usr/bin/env: “node\r”: 没有那个文件或目录
error Command failed with exit code 127.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

需要查看具体报错和库的源码，找到实际执行的脚本，本项目出现错误的文件为 `node_modules/ee-core/bin/tools.js` 文件，该文件下第一行 `#!/usr/bin/env node` 就是问题所在，具体原因可以查找文件 `CR`、`LF`、`CRLF` 换行控制符的相关资料。

tools.js：
```javascript
#!/usr/bin/env node

const replaceDist = require('../tools/replaceDist');
const encrypt = require('../tools/encrypt');

// argv
const args = process.argv;
// console.log('[ee-core] args:', args);
const cmd = args[2];
console.log('[ee-core] [bin/tools] cmd:', cmd);

if (cmd == 'rd') {
  replaceDist.run();
}

if (cmd == 'encrypt') {
  encrypt.run();
}
```
解决步骤：  
1.在当前项目下打开终端，使用vi编辑器打开文件

```
vi node_modules/ee-core/bin/tools.js
```
2.打开文件后执行以下命令，将文件设置为unix格式文件

```
set ff=unix
```

3.保存并退出

```
:wq
```

之后再执行打包命令即可



## 关于应用图标优化
1. 优化icon锯齿问题，需要UI提供128x128大小的png来生成ico，大多数在线ico转换的结果都存在锯齿，通过使用以下网站的在线转换发现效果比较优秀：[https://convertico.com/#google_vignette](https://convertico.com/#google_vignette)
2. linux系统下打包icon需要256x256及以上的png图

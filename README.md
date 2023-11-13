# ElectronVueTemplate

## 官方文档

[https://www.yuque.com/u34495/mivcfg](https://www.yuque.com/u34495/mivcfg)

## 使用说明

### 设置国内镜像源

```
npm config set registry https://registry.npmmirror.com/  
or
yarn config set registry https://registry.npmmirror.com/
```

```
npm config set electron_mirror https://npmmirror.com/mirrors/electron/  
or
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

### 运行项目

1. 选择要使用的前端技术，将 `frontend-xxxxx` 目录重命名为 `frontend`
2. 在项目的根路径下执行 `npm install` 或 `yarn install` 命令安装项目依赖，之后再进入 `frontend` 目录执行 `yarn install` 安装前端的依赖
3. `vue-devtools` 版本调整
- 使用 `vue2` 前端模板请在项目根路径下的 `package.json` 文件， 将 `@vue/devtools` 包的版本调整为 `5.3.4`
- 使用 `vue3` 前端模板，则调整为 `6.5.0`
```
// vue2
"devDependencies": {
  "@vue/devtools": "5.3.4",
}

// vue3
"devDependencies": {
  "@vue/devtools": "6.5.0",
} 
```

### 运行开发环境

```
yarn dev
```

### 打包

```
yarn pak
```

该命令会根据当前操作系统执行相应的打包流程，`FAQ.md` 文件记录了一些本项目在 `linux-arm64` 和 `windows` 系统下打包出现的常见问题

const { cwd, chdir } = require('process')
const { exec, spawn, execSync } = require('child_process')
const fs = require('fs').promises
const path = require('path')
const { task, src, dest, watch, series, parallel } = require('gulp')
const http = require('http')
const packageJson = require('./package.json')
const os = require('os')
const { platform, arch } = require('process')

function launchFrontend() {
  const cwdSave = cwd()
  // 更改node进程的工作目录
  chdir(path.resolve(cwd(), 'frontend'))
  const serve = exec('npm run dev')

  serve.stdout.on('data', (data) => {
    process.stdout.write(data.toString('utf-8'))
  })
  serve.stderr.on('data', (data) => {
    process.stderr.write(data.toString('utf-8'))
  })

  // 设置原来的node进程的工作目录
  chdir(path.resolve(cwdSave))
}

function launchDevTool() {
  const enable = packageJson.dev.VUE_DEVTOOLS_ENABLE
  if (!enable) return

  const port = packageJson.dev.VUE_DEVTOOLS_PORT
  const devtool = exec(`npm run vue-devtool`, {
    env: {
      PORT: port
    }
  })

  devtool.stdout.on('data', (data) => {
    process.stdout.write(data.toString('utf-8'))
  })
  devtool.stderr.on('data', (data) => {
    process.stderr.write(data.toString('utf-8'))
  })
}


async function launchElectron() {
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms)
    })
  }

  const ping = (port) => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}`, res => {
        resolve(res.statusCode)
      })
        .on('error', err => {
          resolve(500)
        })
    })
  }

  const port = packageJson.dev.VUE_DEV_SERVER_PORT
  for (let i = 0; i < 100; i++) {
    const code = await ping(port)

    if (code !== 500) {
      const app = exec('npm run reload')
      app.stdout.on('data', (data) => {
        process.stdout.write(data.toString('utf-8'))
      })
      app.stderr.on('data', (data) => {
        process.stderr.write(data.toString('utf-8'))
      })
      break
    }
    await sleep(1000)
  }
}

async function buildPackage() {
  let cmd = 'npm run build-'
  // platform: 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'
  // arch: 'arm', 'arm64', 'ia32', 'mips','mipsel', 'ppc', 'ppc64', 's390', 's390x', and 'x64'.
  if (platform === 'linux') cmd += 'l'
  if (platform === 'win32') cmd += 'w'
  if (platform === 'darwin') cmd += 'm'

  if (platform !== 'darwin') {
    if (arch === 'ia32') cmd += '-32'
    if (arch === 'x64') cmd += '-64'
  }
  if (arch === 'arm64') cmd += '-arm64'

  const buildPackage = exec(cmd)
  buildPackage.stdout.on('data', (data) => {
    process.stdout.write(data.toString('utf-8'))
  })
  buildPackage.stderr.on('data', (data) => {
    process.stderr.write(data.toString('utf-8'))
  })
}

async function encrypt() {
  let cmd = 'npm run encrypt'

  const en = exec(cmd)
  en.stdout.on('data', (data) => {
    process.stdout.write(data.toString('utf-8'))
  })
  en.stderr.on('data', (data) => {
    process.stderr.write(data.toString('utf-8'))
  })

  /**
   * stdio流关闭时，退出码为0表示命令执行成功，此时将bridge.js文件复制到预打包文件的目录中
   * 这么做的目的是因为bridge.js使用bytenode进行字节码加密后，加密后的文件为bridge.jsc
   * 这个jsc的字节码文件无法在创建窗体的配置项webPreferences.preload中加载
   * 所以需要单独将js文件复制到打包后可以让程序加载的路径下，保证程序正常运行
   */
  en.on('close', async (code) => {
    if (code === 0) {
      await fs.rm('./public/electron/preload/bridge.jsc', { force: true })
      return src('./electron/preload/bridge.js')
        .pipe(dest('./public/electron/preload/'))
    }
  })
  // en.on('exit', (code) => {
  //   console.log('exit', code)
  // })
}

// 一键启动项目
task('dev', parallel(launchDevTool, launchFrontend, launchElectron))
// 根据系统环境打包
task('build-package', buildPackage)

task('encrypt', encrypt)

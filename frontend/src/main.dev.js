export default async function () {
  // 远程连接vue-devtools调试vue
  const packageJson = await import( '../../package.json')
  const port = packageJson.dev.VUE_DEVTOOLS_PORT
  const enable = packageJson.dev.VUE_DEVTOOLS_ENABLE

  if (enable) {
    window.__VUE_DEVTOOLS_PORT__ = port
    const script = document.createElement('script')
    script.src = `http://localhost:${port}`
    document.head.appendChild(script)
  }
}

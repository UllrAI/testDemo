class LocalStore {
  constructor(name, sessionStorageMode) {
    this.store = localStorage
    this.keyPrefix = ''

    if (sessionStorageMode) {
      this.store = sessionStorage
    }

    if (name !== '') {
      // 加上前缀模拟命名空间来区分模块
      this.keyPrefix = name + '.'
    }
  }

  get(key) {
    try {
      const result = this.store.getItem(this.keyPrefix + key)
      // 获取对象时反序列化
      if (result) {
        return JSON.parse(result)
      } else {
        return null
      }
    } catch (e) {
      // 序列化异常则返回普通字符串
      return this.store.getItem(this.keyPrefix + key)
    }
  }

  set(key, value) {
    if (value === undefined) {
      value = null
    }
    if (typeof value === 'string') {
      this.store.setItem(this.keyPrefix + key, value)
    } else {
      this.store.setItem(this.keyPrefix + key, JSON.stringify(value))
    }
  }

  changeSpace(name) {
    if (name !== '') {
      // 加上前缀模拟命名空间来区分模块
      this.keyPrefix = name + '.'
    } else {
      this.keyPrefix = ''
    }
  }

  remove(key) {
    this.store.removeItem(this.keyPrefix + key)
  }

  // 删除命名空间下所有的项
  clear() {
    const keys = Object.keys(this.store)
    keys.forEach(key => {
      if (key.indexOf(this.keyPrefix) === 0) {
        this.store.removeItem(key)
      }
    })
  }

  // 获取当前命名空间下所有的项
  getAll() {
    let result = {}
    const keys = Object.keys(this.store)

    if (this.keyPrefix === '') {
      keys.forEach(key => {
        result[key] = this.get(key)
      })
    } else {
      keys.forEach(fullKey => {
        if (fullKey.indexOf(this.keyPrefix) === 0) {
          const split = fullKey.split(this.keyPrefix)
          const key = split[split.length - 1]
          result[key] = this.get(key)
        }
      })
    }
    return result
  }

  static clearSession() {
    sessionStorage.clear()
  }

  static clearLocal() {
    localStorage.clear()
  }

  static clearAll() {
    localStorage.clear()
    sessionStorage.clear()
  }
}

export default LocalStore

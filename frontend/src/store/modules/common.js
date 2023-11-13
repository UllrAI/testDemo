const SET_IMPORT_FLAG = 'SET_IMPORT_FLAG'

const getDefaultState = () => {
  return {
    // 用来判断系统是否在执行任务
    importFlag: false,
  }
}

const state = getDefaultState()

const mutations = {
  SET_IMPORT_FLAG(state, value) {
    state.importFlag = value
  },
}

const actions = {
  setImportFlag({commit}, value) {
    commit(SET_IMPORT_FLAG, value)
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

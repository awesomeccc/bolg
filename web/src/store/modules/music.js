/**
 * MusicList
 */

const state = {
  playList: [],
  isLoading: true,
}

const mutations = {
  // 存储list
  SET_PLAYLIST(state, list) {
    state.playList = list
  }


}
const getters = {
  isPlayList(state) {
    return state.playList
  }
}
const actions = {
  /**
   * 存储playList
   * @param state
   * @param list
   */
  // SET_PLAYLIST(state, list) {
  //   state.commit('SET_PLAYLIST', list)
  // }

}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

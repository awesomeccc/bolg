/**
 * MusicList
 */

const state = {
  playList: [],
  isLoading: true,
  disc: {},
  currentIndex: 0
}

const mutations = {
  // 存储list
  SET_PLAYLIST(state, list) {
    state.playList = list
  },
  SET_DISC(state, disc1) {
    state.disc = disc1
  },
  SET_CURRENT_INDEX(state,index){
    state.currentIndex = index
  }


}
const getters = {
  isPlayList(state) {
    return state.playList
  },
  isDisc(state) {
    return state.disc
  },
  isCurrentIndex(state) {
    return state.currentIndex
  },
  currentSong  (state)  {
    return state.playList[state.currentIndex] || {}
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
 selectPlay  ({commit, state}, {list, index}) {
    // commit(types.SET_SEQUENCE_LIST, list)
 
    commit(SET_PLAYLIST, list)
    
    commit(SET_CURRENT_INDEX, index)
    // commit(types.SET_FULL_SCREEN, true)
    // commit(types.SET_PLAYING_STATE, true)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

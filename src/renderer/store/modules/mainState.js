 const state = {

  property1: 0,
  extensions: []
}

const mutations = {

  INCREMENT_MAIN_COUNTER (state) {

    state.property1++
  },

  LOAD_EXTENSIONS (state, extensions) {

    let cleanArr = []

    extensions.map(i => {

      cleanArr.push(i.extensions)
    })

    state.extensions = cleanArr
  }
}

const actions = {

  incrementCounter ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },

  loadExtensions ({ commit }) {

    $.getJSON('http://localhost:8081/api/getExtensions', function(response) {

      commit('LOAD_EXTENSIONS', response)
    })
  }
}

export default {
  state,
  mutations,
  actions
}

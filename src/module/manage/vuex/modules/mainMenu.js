/**
 * Created by truncate on 2017/4/12.
 */
import * as types from '../mutation-types'

const state = {
    mainMenu: JSON.parse(window.localStorage.getItem('mainMenu')) || {},
    auth: {}
}

const mutations = {
    //所有菜单
    [types.MAIN_MENU] (state, menu) {
        window.localStorage.setItem('mainMenu', JSON.stringify(menu))
        state.mainMenu = menu
    },
    [types.DEL_MAIN_MENU] (state, menu) {
        window.localStorage.removeItem('mainMenu')
        window.localStorage.removeItem('mainMenu')
        state.mainMenu = menu
    },
    [types.AUTH] (state, auth) {
        state.auth = auth
    }
}

export default {
    state,
    mutations
}

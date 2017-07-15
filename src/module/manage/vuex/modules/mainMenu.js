/**
 * Created by truncate on 2017/4/12.
 */
import * as types from '../mutation-types';

const state = {
    mainMenu: JSON.parse(window.localStorage.getItem('mainMenu')) || {},
    auth: JSON.parse(window.localStorage.getItem('auth')) || {}
};

const mutations = {
    //所有菜单
    [types.MAIN_MENU] (state, menu) {
        window.localStorage.setItem('mainMenu', JSON.stringify(menu));
        state.mainMenu = menu;
    },
    [types.DEL_MAIN_MENU] (state, menu) {
        window.localStorage.removeItem('mainMenu');
        window.localStorage.removeItem('auth');
        state.mainMenu = menu;
        state.auth = {};
    },
    [types.AUTH] (state, auth) {
        window.localStorage.setItem('auth', JSON.stringify(auth));
        state.auth = auth;
    }
};

export default {
    state,
    mutations
};

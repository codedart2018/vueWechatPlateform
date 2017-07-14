/**
 * Created by truncate on 2017/7/12.
 */
import * as types from '../mutation-types';

const state = {
    navigationMenu: JSON.parse(window.localStorage.getItem('merchantMenu')) || {}
}

const mutations = {
    //所有菜单
    [types.MERCHANT_MENU] (state, menu) {
        window.localStorage.setItem('merchantMenu', JSON.stringify(menu));
        state.navigationMenu = menu;
    },
    [types.DELETE_MERCHANT_MENU] (state, menu) {
        window.localStorage.removeItem('merchantMenu');
        state.navigationMenu = menu;
    }
}

export default {
    state,
    mutations
}

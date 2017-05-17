/**
 * Created by truncate on 2017/3/27.
 */

import * as types from '../mutation-types'

const state = {
    user_info: JSON.parse(window.localStorage.getItem('user_info')) || {},
    token: window.localStorage.getItem('token') || ''
}

const mutations = {
    //登陆
    [types.USER_LOGIN] (state, { user_info, token }) {
        window.localStorage.setItem('user_info', JSON.stringify(user_info))
        window.localStorage.setItem('token', token)
        state.user_info = user_info
        state.token = token
    },
    //退出
    [types.USER_OUT] (state) {
        window.localStorage.removeItem('user_info')
        window.localStorage.removeItem('token')
        state.user_info = {}
        state.token = ''
    }
}

export default {
    state,
    mutations
}

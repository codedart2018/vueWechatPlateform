/**
 * Created by truncate on 2017/7/2.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import * as types from '../mutation-types'

const state = {
    user: JSON.parse(window.localStorage.getItem('merchantUser')) || {},
    merchant: JSON.parse(window.localStorage.getItem('merchantInfo')) || {},
    platform: JSON.parse(window.localStorage.getItem('merchantPlatform')) || {},
    token: window.localStorage.getItem('merchantToken') || ''
}

const mutations = {
    //登陆
    [types.MERCHANT_LOGIN] (state, { user, merchant }) {
        window.localStorage.setItem('merchantUser', JSON.stringify(user))
        window.localStorage.setItem('merchantInfo', JSON.stringify(merchant))
        window.localStorage.setItem('merchantToken', user.token)
        state.user = user
        state.merchant = merchant
        state.token = user.token
    },
    //退出
    [types.MERCHANT_OUT] (state) {
        window.localStorage.removeItem('merchantUser')
        window.localStorage.removeItem('merchantInfo')
        window.localStorage.removeItem('merchantToken')
        state.user = {}
        state.merchant = {}
        state.token = ''
    }
}

export default {
    state,
    mutations
}

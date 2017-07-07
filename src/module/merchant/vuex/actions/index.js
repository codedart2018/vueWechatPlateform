/**
 * Created by truncate on 2017/7/2.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《夜》· By codeRabbit 2017.7.2 重庆
 * 灯下斯人寂，独凳无人陪。
 * 问君何处安，唯有代码伴。
 */

import * as types from '../mutation-types'

/**
 * 商户登陆
 * @param commit
 * @param user
 * @param merchant
 */
export const merchantLogin = ({ commit }, { user, merchant}) => {
    if (user && merchant) {
        commit(types.MERCHANT_LOGIN, {
            user: user,
            merchant: merchant
        })
    }
}

/**
 * 商户退出
 * @param commit
 */
export const merchantOut = ({ commit }) => {
    commit(types.MERCHANT_OUT, {
        user: {},
        merchant: {}
    })
}

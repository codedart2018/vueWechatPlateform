/**
 * Created by truncate on 2017/3/27.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from '../actions';
import * as getters from '../getters';
import MainMenu from '../modules/mainMenu';
import User from '../modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    //todo 这里引用了modules 模块 在其它地方需要这个数据的时候 不管是在getters 还是 actions里面 都是用state.模块名.初始名称 例：state.Counter.count 不然无法找到这个值或者对象
    //全程无法取出数据的时候可以用 Vue工具查看数据树 也可以用console.log 直接把state 打印出来看 这样数据一目了然好跟踪
    actions,
    getters,
    modules: {
        MainMenu,
        User
    }
});

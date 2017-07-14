/**
 * Created by truncate on 2017/4/19.
 * 网络请求插件 引入了toast 加载提示
 * 想打张白条给你，上面就写着，我欠你一生温柔，一世呵护！分期一万年！我爱你，夜！
 */

import methodMap from './methodMap'
import AxiosInst from './axios'

class Http {

}

Http.install = function (Vue) {
    
    /**
     * 全局请求接口
     * @param method 方法
     * @param opts 参数
     * @param toast 是否提示
     * @returns {string}
     */
    Vue.prototype.request = function (method, opts, toast) {
        //如果有给 toast 参数则显示 loading 加载数据
        if(toast && typeof (toast) == 'boolean') {
            Vue.prototype.$loading("加载中...")
        } else if(toast && typeof (toast) == 'string') {
            Vue.prototype.$loading(toast)
        }
        let m = methodMap[method]
        if (m) {
            var opts_type = typeof(opts);
            if (opts_type == null || opts_type != 'object') {
                opts = {}
            }
            if(m.method == 'get') {
                return Vue.prototype.apiGet(m.url, opts)
            } else if(m.method == 'post') {
                return Vue.prototype.apiPost(m.url, opts)
            } else {
                return "非法请求";
            }

        } else {
            closeLoading()
            console.log("url 错误", "返回结果：err = ", "无法请求，无效的请求！", "\n")
        }
    }

    /**
     * POST 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiPost = function(url, data, toast = false) {
        if(toast && typeof (toast) == 'boolean') {
            Vue.prototype.$loading("加载中...")
        } else if(toast && typeof (toast) == 'string') {
            Vue.prototype.$loading(toast)
        }
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data).then((response) => {
                Vue.prototype.response(response.data)
                resolve(response.data)
            }).catch((response) => {
                this.$Message.error("服务请求出错")
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * GET 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiGet = function(url, data, toast = false) {
        if(toast && typeof (toast) == 'boolean') {
            Vue.prototype.$loading("加载中...")
        } else if(toast && typeof (toast) == 'string') {
            Vue.prototype.$loading(toast)
        }
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data
            }).then((response) => {
                Vue.prototype.response(response.data)
                resolve(response.data)
            }).catch((response) => {
                this.$Message.error("服务请求出错")
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * 关闭方法
     */
    function closeLoading() {
        Vue.prototype.$loading.close()
    }
    
    
    /**
     * 返回码检查
     * @param data
     * @returns {boolean}
     */
    Vue.prototype.response = function (data) {
        if(data == null) {
            console.log("接口输出异常...")
            this.$Message.error("接口输出异常...")
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //商户端错误码
        if(data.code == 2000 && data.status == false) {
            this.$Message.error(data.msg)
            window.localStorage.removeItem('merchantUser')
            window.localStorage.removeItem('merchantInfo')
            window.localStorage.removeItem('merchantToken')
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //没有权限
        if(data['code'] == 1001) {
            this.$Message.error(data['msg'])
            setTimeout(() => closeLoading(), 800)
            return false
        }
        setTimeout(() => closeLoading(), 800)
    }
}

export default Http

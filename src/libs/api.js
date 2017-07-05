/**
 * Created by truncate on 2017/3/31.
 */
const Api = window.Api || {}
/** 主请求域名**/
Api.domain = process.env.NODE_ENV == 'production' ? '' : ''
Api.auth_call_back = process.env.NODE_ENV == 'production' ? 'http://api.daimatu.cn' : 'http://xingke.iask.in'

export default Api

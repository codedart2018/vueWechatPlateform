/**
 * Created by truncate on 2017/3/31.
 */
const Api = window.Api || {}
/** 主请求域名**/
Api.domain = process.env.NODE_ENV == 'production' ? 'http://www.hphp.cn/' : ''

export default Api


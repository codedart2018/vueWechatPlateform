/**
 * Created by truncate on 2017/3/31.
 */
const Api = window.Api || {}
/** 主请求域名**/
Api.domain = process.env.NODE_ENV == 'production' ? '' : ''

export default Api

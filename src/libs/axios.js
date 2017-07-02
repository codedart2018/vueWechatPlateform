/**
 * Created by truncate on 2017/4/10.
 */

import axios from 'axios'
import Qs from 'qs'
import Api from './api'

const config = {
    baseURL: Api.domain,
    timeout: 2000,
    //`withCredentails`选项表明了是否是跨域请求
    withCredentials: true,
    headers: {'Content-Type':'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'},
    transformRequest: [function (data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        data = Qs.stringify(data);
        return data;
    }],
    //返回数据类型
    responseType: 'json',
}

const AxiosInst = axios.create(config);

//请求拦截器
AxiosInst.interceptors.request.use((config) => {
    if (window.localStorage.getItem('token')) {
        config.headers.Authorization = `${window.localStorage.getItem('token')}`;
    }
    return config
},(err) => {
    return Promise.reject(err);
})

//响应拦截器
AxiosInst.interceptors.response.use((response) => {
    //对响应数据做些事
    if(response.data.status == false && response.data.code == 1000) {
        //废弃
    }
    return response;
},(error) => {
    //请求错误时做些事
    return Promise.reject(error)
})

export default AxiosInst

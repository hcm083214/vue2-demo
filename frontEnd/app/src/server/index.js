/*
 * @Author: 黄灿民
 * @Date: 2020-11-28 14:56:17
 * @LastEditTime: 2020-11-28 15:34:47
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\server\index.js
 */
import axios from 'axios';
class Http{
    constructor(options){
        this.options = Object.assign({
            baseURL:'/api'
        },options)
    }
    HttpRequest(){
        const instance = axios.create(this.options);
        this.interceptors(instance);
        return instance;
    }
    interceptors(instance){
        instance.interceptors.request.use(config=>{
            return config;
        })
        instance.interceptors.request.use(response=>{
            return response;
        })
    }
}

const http = new Http();
const httpRequest = http.HttpRequest();

/**
 * @description: 
 * @param {Object} prams
 * @return {*}
 */
export async function upload(prams){
    return await httpRequest.post('/upload',prams)
}
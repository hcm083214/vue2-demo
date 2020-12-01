/*
 * @Author: 黄灿民
 * @Date: 2020-11-28 14:56:17
 * @LastEditTime: 2020-11-30 21:25:25
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\src\server\index.js
 */
import axios from 'axios';
class Http {
    constructor(options) {
        this.options = Object.assign({
            baseURL: '/api'
        }, options)
    }
    HttpRequest() {
        const instance = axios.create(this.options);
        this.interceptors(instance);
        return instance;
    }
    interceptors(instance) {
        instance.interceptors.request.use(config => {
            return config;
        })
        instance.interceptors.request.use(response => {
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
export async function uploadAxios(prams) {
    return await httpRequest.post('/upload', prams)
}

/**
 * @description: 
 * @param {Object} prams
 * @param {String} prams.methods
 * @param {String} prams.url
 * @param {Object} prams.form
 * @return {*}
 */
export function upload({ methods, url, form }, cb, index) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(methods, url);
        xhr.onload = function () {
            resolve(xhr.responseText);
        }
        xhr.upload.onprogress = function (e) {
            //显示进度
            cb(index, e.loaded, e.total)
        }
        xhr.send(form);
    })
}
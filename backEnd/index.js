/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-10-26 15:54:16
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/test',ctx=>{
    ctx.body = '111';
})

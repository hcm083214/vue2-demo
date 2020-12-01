/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-12-01 17:26:02
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.post('/upload',ctx=>{
    ctx.set('Access-Control-Allow-Origin',"*");
    ctx.body = '111';
})

app.listen(3000);
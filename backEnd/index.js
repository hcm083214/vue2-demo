/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-12-01 19:05:05
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const koabody = require('koa-body')

const app = new Koa();
const router = new Router();

app.use(koabody({
    multipart:true
}))


router.post('/upload',ctx=>{
    console.log(ctx.files)
    ctx.body = '111';
    ctx.set("Access-Control-Allow-Origin", " * ");
})

app.use(router.routes())
app.listen(3000);
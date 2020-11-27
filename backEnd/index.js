/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-11-27 14:37:10
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const Koabody = require('koa-body')

const app = new Koa();
const router = new Router();

app.use(Koabody());

router.get('/test',ctx=>{
    ctx.body = '111';
})
router.post('/upload',ctx=>{
    console.log(ctx.request.body)
})
app.listen(8080)

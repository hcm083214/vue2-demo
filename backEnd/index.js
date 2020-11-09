/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-11-09 13:10:26
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const Mock = require('mockjs');
const Random = Mock.Random;
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();
app.use(koaBody())

function createUserInfo() {
    Random.cname();
    let name = Mock.mock('@cname');
    Random.id()
    let id = Mock.mock('@id')
    let age = Mock.mock({
        "age|1-100": 100
    })
    return {
        name,
        id,
        ...age
    }
}

router.post('/data', ctx => {
    // console.log(ctx.request.body);
    let user = [];
    for (let i = 0; i < 15; i++) {
        temp = createUserInfo();
        user.push(temp)
    }
    ctx.body = { 'user': [...user] };
})
app.use(router.routes())

app.listen(3000, () => {
    console.log(`服务已经开启，地址http://localhost:3000/`)
})

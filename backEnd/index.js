/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-11-28 14:25:55
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const Koabody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(Koabody({
    multipart: true,
}));

router.get('/', ctx => {
    ctx.body = '111';
})
router.post('/upload',  ctx => {
    // console.log(ctx.request.files.file)
    ctx.set("Access-Control-Allow-Origin", "*");
    const img = ctx.request.files.file || {};
    if (!Object.keys(img).length) {
        ctx.body = { 'msg': "没有传递图片", 'code': 401 }
        return;
    }
    const imgPath = saveImg(img);

    ctx.body = {
        ...imgPath,
        'code': 200
    }
})
app.use(router.routes())
app.listen(8080)

function saveImg(img) {
    const { name = '', path: imgPath } = img
    const newName = createImgName(name);
    const readStream = fs.createReadStream(imgPath);
    const uploadPath = path.resolve(__dirname, './img', newName);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);

    return {
        'imgPath': '/img'+ newName,
    }
}

function createImgName(name) {
    return Date.now() + "_" + name;
}
/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-12-01 10:22:03
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const serve = require("koa-static");
const Router = require('koa-router');
const Koabody = require('koa-body');
const fs = require('fs');
const path = require('path');
const mysql = require("mysql2/promise");




const app = new Koa();
const router = new Router();

app.use(Koabody({
    multipart: true,
}));

class DB {
    constructor(options) {
        this.options = Object.assign({
            host: "localhost",
            password: "123456",
            user: "root",
            database: "hcm",
        }, options);
    }
    async initDB() {
        const connection = await mysql.createConnection(this.options);
        return connection;
    }
}
// 初始化数据库
const db = new DB();

router.post('/upload', async ctx => {
    /**
     * @description: ctx.request.files必须是一个对象 传递的是[object FileList]报错
     * @param {*} 
     * @return {*}
     */
    ctx.set("Access-Control-Allow-Origin", "*");
    const files = ctx.request.files.files;
    if (!files) {
        ctx.body = { 'msg': "没有传递图片", 'code': 401 }
        return;
    }


    const res = await uploadControl(files);
    ctx.body = JSON.stringify({
        files: res
    });
})

function uploadControl(files) {
    return new Promise(resolve => {
        const asyncQueue = [];
        if (Array.isArray(files)) {
            files.forEach(file => {
                asyncQueue.push(uploadService(file));
            })
        } else {
            asyncQueue.push(uploadService(files));
        }
        Promise.all(asyncQueue).then(res => {
            resolve(res);
        })
    })
}

function uploadService(file) {
    return new Promise(async resolve => {
        let temp = null;
        const img = file;
        if (!Object.keys(img).length) {
            // ctx.body = ctx.request.files.file
            ctx.body = { 'msg': "没有传递图片", 'code': 401 }
            return;
        }
        const { name = '', path: imgPath } = img;
        const newTime = createNewTime();
        const newName = createImgName(name);
        //后端保存图片并提供保存地址
        const imgSavePath = saveImg(newName, imgPath);
        //将新得到的图片地址保存到数据库
        const result = await insertToDb({
            title: name,
            from: '本地',//图片来源
            imgUrl: imgSavePath,//图片地址
            newTime,
        });
        if (result.affectedRows > 0) {
            temp = {
                title: name,
                imgUrl: imgSavePath,
                newTime,
                id: Date.now()
            }
        }
        resolve(temp);
    })
}

function saveImg(newName, imgPath) {
    const readStream = fs.createReadStream(imgPath);
    const uploadPath = path.resolve(__dirname, '../frontEnd/app/src/img', newName);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);
    return './img/' + newName;
}

async function insertToDb({ title, from, newTime, imgUrl }) {
    const connection = await db.initDB();
    const sql =
        "INSERT INTO news (id,title,imgUrl,`from`,newTime) VALUES (0,?,?,?,?)";
    const [result] = await connection.execute(sql, [title, imgUrl, from, newTime]);
    return result;
}

function createImgName(name) {
    //vue打包图片的hash值
    const hash = '.da76812b.'
    const nameArr = name.split('.');
    //  1606563510414_dog.da76812b.jpg
    return Date.now() + "_" + nameArr[0] + hash + nameArr[1];
}

function createNewTime() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

app.use(serve(path.resolve(__dirname + "/img")))

app.use(router.routes())
app.listen(8080)
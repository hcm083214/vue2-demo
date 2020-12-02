/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-12-02 23:03:50
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const koabody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(koabody({
    multipart: true
}))

router.post('/upload', ctx => {
    const chunks = {
        ...ctx.request.files,
        ...ctx.request.body
    }
    console.log("🚀 ~ file: index.js ~ line 31 ~ files", chunks)
    if (!Object.keys(chunks).length) {
        ctx.body = JSON.stringify({
            data: {
                message: '未传递数据'
            }
        })
        return;
    }
    const uploadCtrQuene = [];
    uploadCtrQuene.push(uploadCtr(chunks));
    Promise.all(uploadCtrQuene).then(res => {
        console.log("🚀 ~ file: index.js ~ line 39 ~ Promise.all ~ res", res)
        //进行合并

        //删除chunks文件夹
    })
    ctx.body = JSON.stringify({
        data: { ...chunks, message: '上传成功' }
    });
    ctx.set("Access-Control-Allow-Origin", " * ");
})

app.use(router.routes())
app.listen(3000);

function uploadCtr(chunks) {
    return new Promise(resolve => {
        const result = saveChunks(chunks);
        resolve(result);
    })

}

function saveChunks({ chunks, fileName, chunksNameIndex }) {
    fs.mkdirSync(fileName);
    const chunksSavePath = path.resolve(__dirname, fileName, chunksNameIndex)
    console.log("🚀 ~ file: index.js ~ line 58 ~ saveChunks ~ chunksSavePath", chunksSavePath, chunks.path)
    const readStream = fs.createReadStream(chunks.path);
    const writeStream = fs.createWriteStream(chunksSavePath);
    readStream.pipe(writeStream);

    return {
        chunksSaveDir: path.resolve(__dirname, fileName),
        
    }
}

function createFileName(name) {
    return
}


function delDir(filePath) {
    const dirs = fs.readdirSync(filePath);//读取当前路径下的文件及文件夹
    dirs.forEach(dir => {
        let curPath = filePath + '/' + dir//获得当前路径
        if (fs.statSync(curPath).isDirectory()) {//是否为文件夹
            delDir(curPath);//遍历
        } else if (fs.statSync(curPath).isFile()) {//是否为文件
            fs.unlinkSync(curPath)
        }
    })
    fs.rmdirSync(filePath)//删除空文件夹
}
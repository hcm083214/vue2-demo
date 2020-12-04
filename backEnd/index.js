/*
 * @Author: 黄灿民
 * @Date: 2020-10-26 15:44:10
 * @LastEditTime: 2020-12-04 14:54:37
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

router.post('/upload', ctx => { //切片保存接口
    const chunks = {
        ...ctx.request.files,
        ...ctx.request.body
    }
    if (!Object.keys(chunks).length) {
        ctx.body = JSON.stringify({
            data: {
                message: '未传递数据'
            }
        })
        return;
    }
    uploadCtr(chunks).then(res => {
        ctx.body = JSON.stringify({
            data: { ...chunks, message: '上传成功' }
        });
        ctx.set("Access-Control-Allow-Origin", " * ");
    })

})

router.post('/merge', ctx => { //切片合并接口
    const mergeInfo = JSON.parse(ctx.request.body);
    const fileName = mergeInfo.fileName;
    const chunksNameList = mergeInfo.chunksNameList;
    mergeChunks(fileName, chunksNameList);

    ctx.body = mergeInfo;

})

app.use(router.routes())
app.listen(3000);

/**
 * @description: 创建切片文件夹，并开启切片保存
 * @param {Blob} chunks
 * @param {String} fileName
 * @param {Array} chunksNameList
 * @return {*}
 */
function uploadCtr({ chunks, fileName, chunksNameList }) {
    //创建保存切片的文件夹
    !fs.existsSync(fileName) && fs.mkdirSync(fileName);
    return new Promise(async resolve => {
        const result = await saveChunks({ chunks, fileName, chunksNameList });
        resolve(result);
    });
}


/**
 * @description: 保存切片
 * @param {Blob} chunks
 * @param {String} fileName
 * @param {Array} chunksNameList
 * @return {*}
 */
function saveChunks({ chunks, fileName, chunksNameList }) {
    return new Promise(resolve => {
        const chunksSavePath = path.resolve(__dirname, fileName, chunksNameList)
        const readStream = fs.createReadStream(chunks.path);
        const writeStream = fs.createWriteStream(chunksSavePath);
        readStream.pipe(writeStream);

        resolve({
            chunksSaveDir: path.resolve(__dirname, fileName),
        })

    })
}

/**
 * @description: 合并切片
 * @param {*} fileName
 * @param {*} chunksNameList
 * @return {*}
 */
function mergeChunks(fileName, chunksNameList) {
    const saveFilePath = path.resolve(__dirname, "img", fileName)
    const chunksStream = chunksNameList.map(chunks => {
        const chunksPath = path.resolve(__dirname, fileName, chunks);
        const readStream = fs.createReadStream(chunksPath);
        return readStream
    })
    const chunksLength = chunksStream.length;
    const writeStream = fs.createWriteStream(saveFilePath);
    let isEnd = false
    for (let index = 0, i = 0; index < chunksLength; index++) {
        console.log("🚀 ~ file: index.js ~ line 113 ~ mergeChunks ~ chunksStream[index]", chunksStream[index])
        chunksStream[index].pipe(writeStream, {
            end: isEnd
        })
        i++;
        chunksStream[index].on('end', () => {
            if (i == chunksLength) {
                writeStream.end();
                // delDir(fileName);
            }
        });
    }

}

/**
 * @description: 删除文件夹
 * @param {String} path
 * @return {*}
 */
function delDir(path) {
    const dirs = fs.readdirSync(path);//读取当前路径下的文件及文件夹
    console.log(dirs)
    dirs.forEach(dir => {
        let curPath = path + '/' + dir//获得当前路径
        console.log(curPath)
        if (fs.statSync(curPath).isDirectory()) {//是否为文件夹
            delDir(curPath);//遍历
        } else if (fs.statSync(curPath).isFile()) {//是否为文件
            fs.unlinkSync(curPath)
        }
    })
    fs.rmdirSync(path)//删除空文件夹
}
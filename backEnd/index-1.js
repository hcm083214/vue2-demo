/*
 * @Author: 黄灿民
 * @Date: 2020-11-29 13:28:01
 * @LastEditTime: 2020-11-29 14:24:10
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\backEnd\index.js
 */

const http = require('http')
const multiparty = require('multiparty')

const server = http.createServer((req, res) => {
    const form = new multiparty.Form(
        // {
        //     uploadDir: '/img' // 指定文件存储目录
        // }
    )

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.end("上传失败!");
            return;
        }
        Object.keys(fields).forEach(function (name) {
            console.log('got field named ' + name);
        });

        Object.keys(files).forEach(function (name) {
            console.log('got file named ' + name);
        });


    }) // 将请求参数传入，multiparty会进行相应处理

    form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
        console.log(name, value)
    })

    form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
        console.log(name, file)
    })

    form.on('close', () => {  // 表单数据解析完成，触发close事件
        console.log('表单数据解析完成')
    })
})

server.listen(8080)
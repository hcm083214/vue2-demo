/*
 * @Author: 黄灿民
 * @Date: 2020-11-08 10:06:57
 * @LastEditTime: 2020-11-08 10:08:55
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\vue.config.js
 */
module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
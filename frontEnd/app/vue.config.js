/*
 * @Author: 黄灿民
 * @Date: 2020-11-28 15:12:35
 * @LastEditTime: 2020-11-28 15:17:01
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\vue.config.js
 */
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                pathRewrite: { "^/api": "" }
            }
        }
    }
}
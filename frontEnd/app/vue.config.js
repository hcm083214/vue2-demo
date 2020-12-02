/*
 * @Author: 黄灿民
 * @Date: 2020-12-01 23:18:12
 * @LastEditTime: 2020-12-01 23:21:00
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\vue.config.js
 */
module.exports ={
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}
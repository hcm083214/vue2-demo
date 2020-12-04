/*
 * @Author: 黄灿民
 * @Date: 2020-11-28 15:12:35
 * @LastEditTime: 2020-12-04 15:08:11
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \00.test\frontEnd\app\vue.config.js
 */
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" }
            }
        }
    },
    // // 去除hash值
    // chainWebpack: config => {
    //     if (process.env.NODE_ENV !== 'production') {
    //         // 清除css，js版本号
    //         config.output.filename('static/js/[name].js').end();
    //         config.output.chunkFilename('static/js/[name].js').end();
    //         // 为生产环境修改配置...
    //         config.plugin('extract-css').tap(args => [{
    //                 filename: `static/css/[name].css`,
    //                 chunkFilename: `static/css/[name].css`
    //             }])
    //     }
    // },

}
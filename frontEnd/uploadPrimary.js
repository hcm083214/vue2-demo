/*
 * @Author: 黄灿民
 * @Date: 2020-11-27 16:50:07
 * @LastEditTime: 2020-11-28 14:27:41
 * @LastEditors: 黄灿民
 * @Description: 基本文件上传
 * @FilePath: \00.test\frontEnd\uploadPrimary.js
 */
//基本文件上传
btn.addEventListener('click', upload)

async function upload() {
    const file = mfile.files[0];
    form.append('file', file);

    // uploadAjaxApi()
    const result = await uploadAxiosApi(url, form)
    console.log("🚀 ~ file: uploadPrimary.js ~ line 18 ~ upload ~ result", result)
    return false;
}

function uploadAjaxApi() {
    //原生Ajax
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function () {

        console.log(xhr.responseText)
    }
    xhr.send(form)
}

async function uploadAxiosApi(url, prams) {
    //基于axios
    return await axios.post(url, prams)
}
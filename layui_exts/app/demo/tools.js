function intToDate(timestamp, needTime = true) {
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    if (needTime) {
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
    } else {
        let D = date.getDate();
        return Y + M + D;
    }
}

function showImg(thumb, title = '缩略图') {
    layer.photos({
        photos: {
            "title": title //相册标题
            ,"data": [{
                "src": thumb //原图地址
            }]
        }
        ,shade: 0.01
        ,closeBtn: 1
        ,anim: 5
    });
    // let str = '<img style="width: 300px; height: 100%;" src="' + thumb + '"/>';
    // layer.open({
    //     type: 1,
    //     title: "缩略图",
    //     // area: ['300px', '300px'],
    //     // area: ['600px', '50%'],
    //     content: str //这里content是一个普通的String
    // });
}

function getUrlParam() {
    //通过/截取
    let urlParam={};
    let strArr = location.hash.split('/');
    for (var x in strArr) {
        let vo = strArr[x];
        if (vo.indexOf('=') !== -1) {
            let arr = vo.split('=');
            urlParam[arr[0]] = decodeURIComponent(arr[1]);
        }
    }
    return urlParam;
}

function jumpPage(url, data) {
    for (let x in data){
        url = url+'/' + x + '=' + data[x];
    }
    location.hash = url;
}

function getParam(key) {
    let path = location.hash;
    let arr = path.split('/');
    for(let i in arr){
        let temp = arr[i].split('=');
        if(typeof temp[1]  !== 'undefined'){
            if(key === temp[0]){
                return temp[1];
            }
        }
    }
    return null;
}
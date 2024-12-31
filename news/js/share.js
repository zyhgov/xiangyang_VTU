"use strict";
// new VConsole();
const jsApis = [
    'checkJsApi',
    'onMenuShareTimeline', //分享到微信朋友圈
    'onMenuShareAppMessage',  // //分享给微信朋友
    'onMenuShareQQ',  // 分享到QQ
    'onMenuShareQZone',  // 分享到QQ空间
    'updateAppMessageShareData', // 分享到微信及QQ（新接口）
    'updateTimelineShareData',  // 分享到朋友圈”及“分享到QQ空间（新接口）
] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
/* 微信分享 */
function wxConfig(config) {
    //   var url = 'http://api.home.news.cn/wx/jsapi.do';
    //   var url = 'http://localhost:3000/share/wx';
    var url = 'https://share.gpowersoft.com:3000/share/wx';
    console.log('执行ajax', config);
    $.ajax({
        url: url,
        type: 'get',
        // 设置的是请求参数
        data: {
            // mpId: 356,
            // mpId: 390,
            url: window.location.href
            // url: 'http://service.gpowersoft.com/wx/'
        },
        dataType: 'jsonp',
        success: function success(res) {
            console.log('res', res);
            if (res.code === 200) {
                window.wx.config({
                    // debug: true,
                    // 开启调试模式,调用的所有api的返回值会在客户端// alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.content.appId,
                    // 必填，公众号的唯一标识
                    timestamp: res.content.timestamp,
                    // 必填，生成签名的时间戳
                    nonceStr: res.content.nonceStr+'',
                    // 必填，生成签名的随机串
                    signature: res.content.signature,
                    // 必填，签名，见附录1
                    jsApiList: jsApis

                }); // config.callback && config.callback(config.data)
                wxReady(config);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //查看错误信息
            console.log('XMLHttpRequest, textStatus, errorThrown ', XMLHttpRequest, textStatus, errorThrown)
        }
    });
}
const commonShareData = (config) => ({
    title: config.title,
    desc: config.desc,
    link: config.link,
    imgUrl: config.imgUrl,
    success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功3');
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('分享失败3');
    }
})
function wxReady(config) {
    console.log('wxReady', config)
    wx.ready(function () {
        // checkApi()
        // window.global.canUse = true
        // alert('can')
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData(commonShareData(config));
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData(commonShareData(config));
        wx.onMenuShareAppMessage(commonShareData(config));
        wx.onMenuShareTimeline(commonShareData(config));
    });
    wx.error((err) => {
        console.log('err', err)
    })
}
function checkApi() {
    wx.checkJsApi({
        jsApiList: jsApis, // 需要检测的 JS 接口列表，所有 JS 接口列表见附录2,
        success: function (res) {
            console.log('checkApi:  ', res)
            // 以键值对的形式返回，可用的 api 值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
    });
}
//# sourceMappingURL=maps/share.js.map

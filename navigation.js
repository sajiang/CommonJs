/**
 * 在微信中进行导航，如果失败则调用腾讯地图api
 */
function navInWechat(lat,lng,navAddress,detailInfo){
    var lat=parseFloat(navRoute.split(",")[0]);
    var lng=parseFloat(lng);
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        wx.openLocation({
            latitude: lat, // 纬度，浮点数，范围为90 ~ -90
            longitude: lng, // 经度，浮点数，范围为180 ~ -180。
            name: navAddress, // 位置名
            address: detailInfo, // 地址详情说明
            scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl:""// 在查看位置界面底部显示的超链接,可点击跳转
        });
    }else{
        window.location.href = "http://apis.map.qq.com/uri/v1/routeplan?type=drive&to="
            +navAddress+"&tocoord="+lat+","+lng;
    }
}
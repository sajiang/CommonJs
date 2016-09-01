/**
 *增加cookies
 */
function setCookie(name, value) {
    document.cookie = name + "=" + escape(value);
}

/**
 *增加cookies
 *
 * expiredays:有效天数
 */
function setCookieExpiredays(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * 读取cookies
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 *删除cookies
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;

function getRad(d){
    return d*PI/180.0;
}
/*获取地球上两点间的*/
function getFlatternDistance(lat1,lng1,lat2,lng2){
    lat1=parseFloat(lat1);
    lng1=parseFloat(lng1);
    lat2=parseFloat(lat2);
    lng2=parseFloat(lng2);
    var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s,c,w,r,d,h1,h2;
    var a = EARTH_RADIUS;
    var fl = 1/298.257;

    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;

    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;

    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;

    return parseInt(d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))/1000);
    //返回km
}
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
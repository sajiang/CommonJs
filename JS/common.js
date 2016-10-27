function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function sec2min(sec){
	var min=parseInt(sec)/60;
	var sec=min*60-parseInt(sec);
	return min+"分"+sec+"秒";
}
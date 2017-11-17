/**
 * Created by Kathy on 16/11/2017.
 */
var _mm=require('util/mm.js');

var _user = {
    logout : function(resolve,reject){
        _mm.request({
            url: _mm.getServrUrl('/user/get_user_info.do'),
            method: 'POST',
            success : resolve,
            error:reject
        });
    },
    //检查登陆状态
    checkLogin : function(resolve,reject){
        _mm.request({
            url: _mm.getServrUrl('/user/logout.do'),
            method: 'POST',
            success : resolve,
            error:reject
        });
    }
}
module.exports = _user;

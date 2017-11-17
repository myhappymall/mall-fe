
var conf = {
    serverHost : ''
};

var Hogan = require('hogan.js');

var _mm = {
  request : function(param){
      var _this = this;
      $.ajax({
          type : param.method || 'get',
          url  : param.url || '',
          dataType  : param.type || 'json',
          data      : param.data || '',
          success   : function(res){
            if(res.status == 0){//这部分不是很清楚
                typeof param.success == 'function' && param.success(res.data,res.msg)
            }//没有登陆状态需要登录
            else if(res.status == 10){
                  _this.doLogin();
              }
              //请求数据错误
              else if(res.status == 1){
                typeof param.error == 'function' && param.error(res.msg)
            }
          },
          error     : function(err){
              typeof param.error == 'function' && param.error(err.statusText)
          }
      });
  },
    //获取服务器地址
    getServrUrl : function(path){
      return conf.serverHost + path;
    },
    //url格式例如localhost:8080/index.html?key=value&test=123，获取test或者key
    getUrlParam : function(name){
        var reg = RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    },
    renderHtml: function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;

    },
    //成功提示
    successTips: function(msg){
        alert(msg || "操作成功");
    },
    errorTips: function(msg){
        alert(msg||"操作失败");
    },
    //非空手机邮箱验证
    validate: function(value, type){
        var value=$.trim(value);
        if(type == 'require'){
            return !!value;

        }
        if(type == 'phone'){
            return /^1\d{10}$/.test();
        }
        if(type == 'email'){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);

        }
    },
    goHome : function(){
        window.location.href = './index.html';
    },
    doLogin : function(){
      window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;
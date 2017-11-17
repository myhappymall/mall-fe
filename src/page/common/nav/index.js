/**
 * Created by Kathy on 16/11/2017.
 */
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav={
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登陆点击
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击
        $('.js-register').click(function(){
            window.location.href = './register.html';
        });
        //退出点击，需要请求到后端，把登陆的状态需要删除
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
            _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        });
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        },function(errMsg){
            $('.nav .cart-count').text(0);
        });
    }
};

//由于链式写法，输出的还是nav，也可以在外面调用init
module.exports = nav.init();
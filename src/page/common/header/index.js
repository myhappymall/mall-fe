/**
 * Created by Kathy on 16/11/2017.
 */
require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header={
    init : function(){
        this.bindEvent();
    },
    onLoad: function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword如果存在，回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        //搜索按钮点击后，搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后，也是搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode == 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit: function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword，正常跳转到list页面，否则返回首页
        if(keyword){
            window.location.href = './list.html?keyword='+ keyword;
        }else{
            _mm.goHome();
        }
    }

};

// 不需要输出header，因为没有其它的引用
 header.init();
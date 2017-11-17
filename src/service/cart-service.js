/**
 * Created by Kathy on 16/11/2017.
 */
var _mm=require('util/mm.js');

var _cart = {
    getCartCount : function(resolve,reject){
        _mm.request({
            url: _mm.getServrUrl('/cart/get_cart_product.count.do'),
            success : resolve,
            error:reject
        });
    }
}
module.exports = _cart;
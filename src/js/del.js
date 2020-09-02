import { cookie } from './lib/cookie.js';
import $ from './jquery.js';

let deletecart = function() {
    $('.main').on('click', '.del' + i + '', function() {
        // let list = JSON.parse(localStorage.getItem('shop'));
        console.log(shop);
        // console.log(list);
        // 获取点击行的商品id
        let li = $(this).parent().parent().attr("id");
        // // 点击所在行商品的数据
        let arr2 = shop.filter(val => val.id == li);
        // // 根据索引删除数组中内容
        shop.splice(shop.indexOf(arr2[0]), 1);
        console.log(shop);
        // // 将数组转为字符串后存入localstorage
        cookie.set('shop', JSON.stringify(shop));
        location.reload();
    });
}

export { deletecart };
import $ from './jquery.js';
import { footer } from './footer.js';
import { cookie } from './lib/cookie.js';
// import { deletecart } from './del';
(function() {
    // 在点击加入购物车的时候 将数据库根据你id查找到的当前商品的id以及价格已经写入到了本本地的cookie里面去了，如果没有 就不会执行
    let shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop); //  有cookie数据 才转JSON
        // 接收到的是json字符串  将其转成json对象 外层是数组里面是对应的商品ID价格数量组成的对象
        let idList = shop.map(elm => elm.id).join(); // 获取所有id
        // cookie里面的id顺序  1 4 2
        $.ajax({
            type: "get",
            url: "../../interface/getitems.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                var meizuCount;
                var meizuCount1;
                // console.log(res);
                var template = '';
                var total = 0;
                res.forEach((elm, i) => {
                    let picture = JSON.parse(elm.picture);
                    // 让ajax获得的数据结果的id 与 cookie中id  一一对应
                    // 从cookie中去筛选数据
                    let arr = shop.filter(val => val.id == elm.id);
                    template += `
                    <div class="commodity_phone commodity_phone${i}" id="${elm.id}">
                        <input type="checkbox" checked class="checkbox selectItem" style="zoom:160%; vertical-align: middle;">
                        <img src="..${picture[1].src}" alt="" style="width: 100px;vertical-align: middle;">
                        <span>  ${elm.title} <br><span>全网通公开版 定白 12+3${elm.num}GB</span></span>
                        <div class="right">
                        <span>￥   ${elm.price}</span>
                        <span class="calcu${i}">
                             <button class="remove${i}">-</button><input type="text" id="phoneCount${i}" value="${arr[0].num}" min="1" max="${elm.num}"><button class="add${i}">+</button>
                        </span>
                        <span class="pro_total_price_cal pro_total_price pro_total_price${i}">${(elm.price*arr[0].num).toFixed(2)}</span>
                        <a class="pro_Del del${i}" href="javascript:;">删除</a>
                    </div>
                    </div>
                    `;
                    total += elm.price * arr[0].num;
                    $('.main').on('click', '.add' + i + '', function() {
                        total = 0;
                        meizuCount = 1;
                        meizuCount = $('#phoneCount' + i + '').val();
                        meizuCount++;
                        if (meizuCount >= $('#phoneCount' + i + '').attr("max")) {
                            meizuCount = $('#phoneCount' + i + '').attr("max")
                        }
                        $('#phoneCount' + i + '').val(meizuCount)
                        let phone_total_price = $('#phoneCount' + i + '').val() * elm.price;
                        $('.pro_total_price' + i + '').html('' + phone_total_price + '.00');
                        $('.selected').html('￥' + total + '')
                        $('.pro_total_price').each(function(i, elm) {
                            total += parseInt($(elm).html());
                        })
                        $('.selected').html('￥' + total + '.00')
                    });
                    // deletecart();
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

                    $('.main').on('click', '.remove' + i + '', function() {
                        total = 0;
                        meizuCount1 = $('#phoneCount' + i + '').val();
                        meizuCount1--;
                        if (meizuCount1 <= 1) {
                            meizuCount1 = 1
                        }
                        $('#phoneCount' + i + '').val(meizuCount1);
                        let phone_total_price1 = $('#phoneCount' + i + '').val() * elm.price;
                        $('.pro_total_price' + i + '').html('' + phone_total_price1 + '.00');
                        $('.selected').html('￥' + total + '')
                        $('.pro_total_price').each(function(i, elm) {
                            total += parseInt($(elm).html());
                        })
                        $('.selected').html('￥' + total + '.00')
                    })

                });
                $('.selected').html('￥' + total + '');
                $('.commodity_footer').before(template);
                $('.selectall').each(function(i, elm) {
                    $(elm).on('click', function() {
                        $("input[type='checkbox']").prop("checked", $(this).prop('checked'));
                        if (!$(elm).prop("checked")) {
                            $('.selected').html('￥ 0');
                        } else {
                            $('.selected').html('￥' + total + '');
                        }
                    })
                })
                $('.totalCount').html($('.selectItem').length)
                $('.selectItem').each(function(i, elm) {
                    $(elm).on('click', function() {
                        let sub1 = $(this).parent().children().last().children().eq(2);
                        let sub = $(this).parent().children().last().children().eq(2).html();
                        if (!$(elm).prop("checked")) {
                            sub1.removeClass('pro_total_price_cal')
                            total -= sub;
                            if (total <= 0) {
                                total = 0;
                            }
                            $('.selected').html('￥' + total + '');
                        } else {
                            sub1.addClass('pro_total_price_cal')
                            total += parseInt(sub);
                            $('.selected').html('￥' + total + '');
                        }


                        let total2 = 0;
                        ($('.pro_total_price_cal')).each(function(i, elm) {
                            let num1 = $(elm).html()
                                // console.log(typeof num1);
                                // console.log(num1);
                            console.log(parseInt(num1));


                            total2 += parseInt(num1);
                            console.log(total2);
                            $('.selected').html('￥' + total2 + '');
                        })


                    })
                })
                console.log($('.selectItem').length);
                if ($('.selectItem').length == 0) {
                    $('.selected').html('￥0')
                }
            }
        });
    }
})();
$(function() {
    $('footer').html(footer);
})
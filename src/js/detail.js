import $ from './jquery.js';
import { header } from './header.js';
import { footer } from './footer.js';
import { cookie } from './lib/cookie.js';


(function() {
    $('header').html(header);
    $('footer').html(footer);
    let id = location.search.split('=')[1]; // 获取id
    // console.log(id);


    $.ajax({
        type: "get",
        url: "../../interface/getitem.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {
            console.log(res.price);
            console.log(res.title);
            let picture = JSON.parse(res.picture);

            let template = `
            <div class="bigimg bigimg0">
            <img src="..${picture[5].src}" alt="">
            <div class="movebox hide"></div>
        </div>
        <div class="bigimg bigimg1">
            <img src="..${picture[6].src}" alt="">
            <div class="movebox hide"></div>

        </div>
        <div class="bigimg bigimg2">
            <img src="..${picture[7].src}" alt="">
            <div class="movebox hide"></div>

        </div>
        <div class="bigimg bigimg3">
            <img src="..${picture[8].src}" alt="">
            <div class="movebox hide"></div>

        </div>

        <div class="bigshowWrap"></div>
        <div class="bigshow hide">
            <img src="..${picture[5].src}" class="img img0 hide" alt="">
            <img src="..${picture[6].src}" class="img img1 hide" alt="">
            <img src="..${picture[7].src}" class="img2 hide img" alt="">
            <img src="..${picture[8].src}" class="img3 hide img" alt="">
        </div>


        <ul>
            <li class="small1">
                <img src="..${picture[1].src}" alt="">
            </li>
            <li class="small2">
                <img src="..${picture[2].src}" alt="">
            </li>
            <li class="small3">
                <img src="..${picture[3].src}" alt="">
            </li>
            <li class="small4">
                <img src="..${picture[4].src}" alt="">
            </li>
        </ul>
            `;




            let template1 = `
            <div class="title">
                <p>${res.title}</p>
                <p>${res.details}</p>
            </div>
            <div class="price">
                <p>￥ ${res.price}</p>
                <span>加价购</span><span> &nbsp;&nbsp; 另加29元起，即可换购超值商品&nbsp;&nbsp;</span><a href="">立即加购 ></a>
            </div>
            `;
            $('.phoneDetail_right').prepend(template1);
            $('.phoneDetail_left').append(template);
            $('.car').on('click', function() {
                addItem(res.id, res.price, $('#phoneCount').val());
                $('.hadow').removeClass('hadow').addClass('shadow');
                setTimeout(() => {
                    $('.shadow').removeClass('shadow').addClass('hadow');
                }, 3000);
            });
            $('.buy').on('click', function() {
                addItem(res.id, res.price, $('#phoneCount').val());
            });
            fangdajing();
        }
    });

    function fangdajing() {
        // 选项卡切换
        $('.main .phoneDetail_left ul li').on('click', function() {
            let _index = $('.main .phoneDetail_left ul li').index(this);

            $('.bigimg' + _index + '').addClass('fadeshow').siblings().removeClass('fadeshow');

        })
        $('.bigimg').on('dblclick', function() {
            let _index = $('.main .phoneDetail_left>div').index(this);
            $('.bigshow').removeClass('hide');
            // console.log($('.img' + _index + ''));
            $('.img').removeClass('hide');
            $('.img' + _index + '').addClass('show fadeshow').siblings().removeClass('show fadeshow');
            // $('.bigshowWrap').removeClass('hide').addClass('shadow')
        })
        $('.bigimg').on('mouseout', function() {
            // $('.bigshowWrap').addClass('hide')
            $('.bigshow').addClass('hide');
            // 放大镜功能
            let movebox = $('.movebox'),
                bigpicture = $('.img'),
                small = $('.bigimg'),
                big = $('.bigshow');


            // 1. 事件绑定 small  mouseover事件
            small.on('mouseover', function() {
                // 显示元素
                movebox.removeClass('hide');
                // big.addClass('show');

                // 5. 给movebox设置大小
                movebox.css({
                    width: (small[0].offsetWidth * big[0].offsetWidth / bigpicture[0].offsetWidth) + 'px',
                    height: (small[0].offsetHeight * big[0].offsetHeight / bigpicture[0].offsetHeight) + 'px'
                })

                // 3. 让movebox跟随鼠标移动
                small.on('mousemove', function(ev) {
                    let top = ev.pageY - small.offset().top - movebox[0].offsetHeight / 2;
                    let left = ev.pageX - small.offset().left - movebox[0].offsetWidth / 2;


                    //     // 4. 计算移动比例
                    let ratio = bigpicture[0].offsetWidth / small[0].offsetWidth; // 比例必须大于1




                    //     // 边界管理
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= small[0].offsetHeight - movebox[0].offsetHeight) {
                        top = small[0].offsetHeight - movebox[0].offsetHeight - 2;
                    }

                    if (left <= 0) {
                        left = 0;
                    } else if (left >= small[0].offsetWidth - movebox[0].offsetWidth) {
                        left = small[0].offsetWidth - movebox[0].offsetWidth - 2;
                    }

                    movebox.css({
                        top: top + 'px',
                        left: left + 'px'
                    });

                    bigpicture.css({
                        top: ratio * -top + 'px',
                        left: ratio * -left + 'px'
                    });
                });

            });

            // 2. 鼠标离开 隐藏元素
            small.on('mouseout', function() {
                movebox.addClass('hide');

            });

        });


    }

    function addItem(id, price, num) {
        let shop = cookie.get('shop'); // 从cookie中获取shop数据

        let product = {
            id: id,
            price: price,
            num: num
        };

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop);
            // 购物车中是否已经存在当前这件商品
            if (shop.some(elm => elm.id == id)) {
                // 修改数量
                shop.forEach(elm => {
                    elm.id === id ? elm.num = num : null;
                });
            } else {
                // 添加商品
                shop.push(product);
            }

        } else {
            shop = [];
            shop.push(product);
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }

})();



$(function() {
    //引入header以及footer
    $('.application').hover(function() {
        $('header').css({
            "background": "white",

        })
    }, function() {

        $('header').css({
            "background": "transparent",

        })
    })
    $('#mobilePhone').hover(
        function() {
            $('.navigation_wrap').css({
                "opacity": "1",
                "height": "210px",
                "background": "white",
            });
            $('header').css({
                "background": "white",
            });
        },
        function() {
            $('header').css({
                // "height": "210px",
                "background": "transparent",
            });
            $('.navigation_wrap').css({
                // "opacity": ".2",

                "height": "0"
            })
        }
    )
    $('.navigation_wrap').hover(
        function() {
            $('.navigation_wrap').css({

                "height": "210px",
                "background": "white",
            });
            $('header').css({
                "background": "white",
            });
        },
        function() {
            $('header').css({
                "transition": "all .6s",
                "background": "transparent",
                // "height": "210px",
            });
            $('.navigation_wrap').css({
                "height": "0",
                "opacity": ".2",
            })
            $('.nav_phone li').css({
                "opacity": "1",
                "box-shadow": "none"
            })
        }
    )

    $('.nav_phone li').on('mouseover', function() {
        $(this).css({
            "transform": "scale(1.1)",
            "opacity": "1",
            "box-shadow": "0 6px 8px 0 rgba(138,153,150,0.35)"
        }).siblings().css({
            "transform": "scale(1)",
            "opacity": ".3",
            "box-shadow": "none"
        })
    })









    // 数量点击增加减少


    var meizuCount = 1;
    $('.add').on('click', function() {
        meizuCount++;

        $('#phoneCount').val(meizuCount)

    });
    $('.remove').on('click', function() {
        meizuCount--
        if (meizuCount <= 1) {
            meizuCount = 1
        }
        $('#phoneCount').val(meizuCount)
    })




});
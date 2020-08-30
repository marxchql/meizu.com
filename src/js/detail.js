import $ from './jquery.js';
import { header } from './header.js';
import { footer } from './footer.js';

$(function() {
    //引入header以及footer
    $('header').html(header);
    $('footer').html(footer);
    $('#mobilePhone').hover(
        function() {
            // console.log($('.navigation_wrap'));
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
                // "background": "transparent",
                // "height": "210px",
            });
            $('.navigation_wrap').css({
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
                "background": "rgba(255, 255, 255, 0.993)",
                // "height": "210px",
            });
            $('.navigation_wrap').css({
                "height": "0"
            })
            $('.nav_phone li').css({
                "opacity": "1",
                "box-shadow": "none"
            })
        }
    )

    $('.nav_phone li').on('mouseover', function() {
        $(this).css({
            "opacity": "1",
            "box-shadow": "0 6px 8px 0 rgba(138,153,150,0.35)"
        }).siblings().css({
            "opacity": ".7",
            "box-shadow": "none"
        })
    })


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

    });
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



    // 数量点击增加减少
    $('.car').on('click', function() {
        // clearInterval(timer);
        // console.log($('.car'))
        $('.hadow').removeClass('hadow').addClass('shadow');
        setTimeout(() => {
            $('.shadow').removeClass('shadow').addClass('hadow');
        }, 3000);
        // let daojishi = 3;
        // $('.daojishi').html(daojishi)
        // let p1 = new Promise((resolve, reject) => {
        //     var timer = setInterval(() => {
        //         daojishi--;
        //         $('.daojishi').html(daojishi)
        //     }, 1000);
        //     resolve('timer');
        // }).then((val) => {
        //     clearInterval(val)
        // });
    });

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
import $ from './jquery.js';
import { header } from './header.js';
import { footer } from './footer.js';
import './lib/jquery.lazyload.js';


$(function() {

    $('header').html(header);
    $('footer').html(footer);
    let ww = localStorage.getItem("user");
    if (localStorage.getItem("user")) {
        $('.icon-gouwuche').before('<span class="userLogined">退出用户</span>')


    } else {
        $('.icon-wode').remove();
        $('.userLogined').remove();
        $('.icon-gouwuche').before(` <span class="iconfont icon-wode">
        <ul class="user">
        <li><a href="../html/login.html" target="_blank">立即登录</a></li>
        <li><a href="../html/register.html" target="_blank">立即注册</a></li>
        <li><a href="">我的订单</a></li>
        <li><a href="">M码通道</a></li>
    </ul></span>`)
    }
    $('.userLogined').on('click', function() {
        localStorage.removeItem("user");
        location.href = "../html/index.html";
    })
    $('.icon-gouwuche').on('click', function() {
        console.log(11);
        if (localStorage.getItem("user")) {

            location.href = "../html/cart.html";
        } else {
            alert("请先登录账号")
        }
    })


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
                "height": "220px",
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

                "height": "220px",
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
            "box-shadow": "0 18px 18px 0 rgba(138,153,150,0.35)"
        }).siblings().css({
            "transform": "scale(1)",
            "opacity": ".3",
            "box-shadow": "none"
        })
    })

    let count = 7100;

    var timer = setInterval(() => {
        let hour = Math.floor(count / 3600);
        let minute = Math.floor((count / 60) % 60);
        let second = Math.floor((count % 60));
        count--;
        $('.hour').html(hour)
        $('.min').html(minute)
        $('.sec').html(second)
    }, 1000);


    (function() {
        $.ajax({
            type: "get",
            url: "../../interface/getproduct.php",
            dataType: "json",
            success: function(res) {
                // console.log(res);
                // console.log(res[0].picture);
                // let picture = JSON.parse(res[0].picture);
                // console.log(picture);

                // let res = JSON.parse(res);
                let temp = '';
                res.forEach((elm, i) => {
                    let picture = JSON.parse(elm.picture);
                    console.log(picture[i].src);
                    // console.log(picture[1]);
                    if (i == 0) {

                        temp += `<li class="bigintro">
                        <a href="../html/detail.html?id=${elm.id}" target="_blank">
                            <p>${elm.title}</p>
                            <p>限时领券至高省500 + 全新壳膜套装</p>
                            <p>￥ ${elm.title}</p>
                            <img class="lazy" data-original="..${picture[0].src}" alt="">
                        </a>
                    </li>`;



                    } else {

                        temp += ` <li class="smallintro">
                        <a href="../html/detail.html?id=${elm.id}">
                            <img class="lazy" data-original="..${picture[0].src}" alt="">
                            <p> ${elm.title}</p>
                            <p>6.5英寸极边全面屏 | 骁龙855旗舰处理器</p>
                            <p>￥ ${elm.price}</p>
                        </a>
                    </li>`;
                    }



                });
                $('.list').append(temp);
                $("img.lazy").lazyload({
                    placeholder: "../img/loading.gif", //用图片提前占位
                    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
                    effect: "fadeIn", // 载入使用何种效果
                    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
                    // threshold: 200, // 提前开始加载
                    // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
                    // event: 'click', // 事件触发时才加载
                    // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
                    // container: $("#container"), // 对某容器中的图片实现效果
                    // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
                    // failurelimit: 10 // 图片排序混乱时
                    // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
                });
            }
        });

    })()

})
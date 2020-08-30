import $ from './jquery.js';
import { header } from './header.js';
import { footer } from './footer.js';

$(function() {

    $('header').html(header);
    $('footer').html(footer);
    $('#mobilePhone').hover(
        function() {
            // console.log($('.navigation_wrap'));
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
                // "background": "transparent",
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
})
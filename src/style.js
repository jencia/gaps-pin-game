/**
 * Created by Administrator on 2015/8/25.
 */
var bodyH = $(window).height();
trimWhole();
function trimWhole(){
    $('h1').css({
        'font-size': bodyH * 0.1 + 'px',
        'line-height': bodyH * 0.2 + 'px',
        'margin-top': bodyH * 0.1 + 'px'
    });

    $('h2').css({
        'font-size': bodyH * 0.06 + 'px',
        'line-height': bodyH * 0.1 + 'px'
    });

    $('p').css({
        'font-size': bodyH * 0.035 + 'px',
        'line-height': bodyH * 0.05 + 'px'
    });

    $('.btn').css({
        'width': bodyH * 0.3 + 'px',
        'height': bodyH * 0.08 + 'px',
        'font-size': bodyH * 0.04 + 'px',
        'line-height': bodyH * 0.08 + 'px',
        'margin': bodyH * 0.06 + 'px 0 0 ' + (window.innerWidth - bodyH * 0.3)/2+'px',
    });
    $('.menu2 .btn').css({
        'line-height': bodyH * 0.08 + 'px',
        'margin-top': bodyH * 0.03 + 'px',
        'background': '#ddd'
    });
    $('.menu2 .start').css({
        'line-height': bodyH * 0.08 + 'px',
        'margin-top': bodyH * 0.03 + 'px',
        'background': '#ddd'
    });

    $('#style').html(
        '@-webkit-keyframes textAni {' +
            '0%{' +
                'width:' + bodyH * 0.3 + 'px;' +
                'background:#ddd;' +
                'margin-left:'+ $('.menu2 .btn').css('margin-left') + ';' +
            '}'+
            '100%{' +
                'width:' + bodyH * 0.45 + 'px;' +
                'background:#fff;' +
                'margin-left:' + (window.innerWidth-bodyH*0.45) / 2 + 'px;' +
            '}'+
        '}'
    );

    $('strong').css({
        'font-size':bodyH*0.05 + 'px',
        'line-height':bodyH*0.08 + 'px'
    });

    $('.tx img').css('width',bodyH*0.15 + 'px');
    $('.tx').css({
        'margin-left': ($(window).width() - $('.tx img').width()) / 2,
        'margin-bottom': bodyH * 0.02 + 'px'
    });

}
window.onresize = trimWhole;






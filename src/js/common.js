$(function(){
    visualHeight();
    headerPC(); // header evt PC
    headerMob(); // header evt Mob
    $('header .btn-menu-all').on('click', function(){
        $(this).hasClass('open') ? mobgnbClose() : mobgnbOpen();
    });
});

$(window).on('load', function(){
    toTop('.to-top'); // to top evt
});

function visualHeight() {
    var wh = $(window).outerHeight(),
        obj = $('.main-visual .swiper-slide');

    if ( obj.length <= 0 ) return;

    obj.css('height', wh);

    $(window).resize(function(){
        var newwh = $(window).outerHeight();

        obj.css('height', newwh);
    });
}

function headerPC() {
    var alldep1 = $('header #gnb .dep1'),
        alldep2 = $('header #gnb .depth2');
    $('header #gnb .dep1:not(:only-child)').on('mouseenter', function(){
        var dep2 = $(this).siblings('.depth2');

        if( $(this).hasClass('hover') ) return;
        
        $('header').addClass('hover');
        alldep1.removeClass('hover');
        alldep2.removeClass('active');
        alldep2.hide();

        $(this).addClass('hover');
        dep2.show();
        $('header').addClass('pc-evt');
        setTimeout(function(){
            dep2.addClass('active');
        }, 50);
    });
    $('header #gnb .dep1:only-child').on('mouseenter', function(){
        if( $(this).hasClass('hover') ) return;

        $('header').removeClass('pc-evt');
        $('header').addClass('hover');
        alldep1.removeClass('hover');
        alldep2.removeClass('active');
        alldep2.hide();

        $(this).addClass('hover');
    });
    $('header').on('mouseleave', function(){
        $('header').removeClass('pc-evt');
        $('header').removeClass('hover');
        alldep1.removeClass('hover');
        alldep2.removeClass('active');
        alldep2.hide();
    });
}

function headerMob() {
    $('#gnb .dep2-more').on('click', function(){
        var dep2 = $(this).siblings('.depth2'),
            dep1btn = $(this).siblings('.dep1'),
            dep2all = $('#gnb .depth2'),
            dep1all = $('#gnb .dep1');

        if ( dep1btn.hasClass('open') ) {
            dep1btn.removeClass('open');
            dep2.slideUp();
        } else {
            dep2all.slideUp();
            dep1all.removeClass('open');

            dep2.slideDown();
            dep1btn.addClass('open');
        }
    });
}

function mobgnbOpen() {
    var header = $('header'),
        gnb = $('#gnb'),
        menuBtn = $('header .btn-menu-all');

    header.addClass('m-evt');
    menuBtn.addClass('open');
    gnb.slideDown();

    scrollPrevent(true);
}

function mobgnbClose() {
    var header = $('header'),
    gnb = $('#gnb'),
    menuBtn = $('header .btn-menu-all');

    scrollPrevent(false);

    gnb.slideUp();
    setTimeout(function () {
        menuBtn.removeClass('open');
        header.removeClass('m-evt');
    }, 50);
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

function toTop(obj) {
    var $btn = $(obj),

        $btnH = $btn.outerHeight(),
        bodyH = $(document).outerHeight(true),
        winH = $(window).outerHeight(),
        footH = $('footer').outerHeight(),
        tilH = bodyH - footH - 20,
        $btnTop = winH - $btnH - 20;

    $(window).scroll(function(){
        var st = $(this).scrollTop(),
            btnOn = st + $btnTop,
            gap = tilH - btnOn;

        if ( st > 200 ) {
            $btn.fadeIn(200);

            if ( btnOn > tilH ) {
                $btn.css('bottom', -gap + 70);
            } else {
                $btn.css('bottom', 20);
            }
        } else {
            $btn.fadeOut (200);
        }
    });

    $btn.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
}
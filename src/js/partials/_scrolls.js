var $menu = $('.header-block > .menu'),
    $mobilemenu = $('.header-content > .menu'),
    $button = $('.header-content > .button'),
    pscroll = 90;

function scrolltop() {
    $(window).scrollTop() > pscroll
        ? $menu.hasClass('-fixed') || $menu.addClass('-fixed')
        : $menu.hasClass('-fixed') && $menu.removeClass('-fixed')
}

scrolltop();
$(window).scroll(function () {
    scrolltop()
});

$('a.header-logo').click(function (e) {
    if (!$(this).hasClass('-other')) {
        e.preventDefault();
        $('body,html').stop().animate({scrollTop: 0}, 500);
    }
});

// top menu
$button.click(function (e) {
    e.preventDefault();
    $(this).hasClass('-close')
        ? ($button.removeClass('-close'), $mobilemenu.removeClass('-active'))
        : ($button.addClass('-close'), $mobilemenu.addClass('-active'));
});

// scroll to block
$('.scroll-to').click(function (e) {
    e.preventDefault();
    $button.hasClass('-close') && ($mobilemenu.removeClass('-active'), $button.removeClass('-close'));
    $('body,html').stop().animate({scrollTop: $(this.hash).offset().top - 100}, 600);
});




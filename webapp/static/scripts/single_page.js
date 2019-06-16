$(function() {

    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;

        // Mobile height fix
        $('.height-fix').each(function() {
            var h = $(this).height();
            $(this).height(h)
        })
    }


    // EVENT HANDLERS
    $('.page-link').click(function() {
        var anchor = $(this).attr("dest");
        $('.link-wrap').removeClass('visible');

        $('html, body').animate({
            scrollTop: $('#' + anchor).offset().top
        }, 400);
    });

    $('.mdi-menu').click(function() {
        $('.link-wrap').toggleClass('visible');
    });

    $('.demos-wrap').hover(function() {
        $('.demos-wrap').not(this).addClass('fade');
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
        $('.demos-wrap').removeClass('fade');
    });


    // SCROLL ANIMATIONS
    function onScrollInit(items, elemTrigger) {
        var offset = $(window).height() / 1.6
        items.each(function() {
            var elem = $(this),
                animationClass = elem.attr('data-animation'),
                animationDelay = elem.attr('data-delay');

            elem.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            var trigger = (elemTrigger) ? trigger : elem;

            trigger.waypoint(function() {
                elem.addClass('animated').addClass(animationClass);
                if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
            }, {
                triggerOnce: true,
                offset: offset
            });
        });
    }

    setTimeout(function() { onScrollInit($('.waypoint')) }, 10);
});
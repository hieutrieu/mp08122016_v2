(function ($) {
    $(document).ready(function () {
        $(window).bind('scroll', function () {
            var navHeight = 32;
            ($(window).scrollTop() > navHeight) ? $('#navbar-top-menu').addClass('navbar-fixed-top') : $('#navbar-top-menu').removeClass('navbar-fixed-top');
            $('#navbar-top-menu').css('display: block; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)');
        });
        if ($('#carousel').length > 0) {
            $('#carousel').carouFredSel({
                prev: {
                    button: ".prev",
                    key: "left"
                },
                next: {
                    button: ".next",
                    key: "right"
                },
                mousewheel: false,
                swipe: {
                    onMouse: true,
                    onTouch: true
                },
                auto: true
            });
        }
        handleSearch();
        handleBacktoTop();
    });
})(jQuery);
var handleSearch = function () {
    $('.search-btn').click(function () {
        if ($('.search-btn').hasClass('show-search-icon')) {
            if ($(window).width() > 767) {
                $('.search-box').fadeOut(300);
            } else {
                $('.search-box').fadeOut(0);
            }
            $('.search-btn').removeClass('show-search-icon');
        } else {
            if ($(window).width() > 767) {
                $('.search-box').fadeIn(300);
            } else {
                $('.search-box').fadeIn(0);
            }
            $('.search-btn').addClass('show-search-icon');
        }
    });

    // close search box on body click
    if ($('.search-btn').size() != 0) {
        $('.search-box, .search-btn').on('click', function (e) {
            e.stopPropagation();
        });

        $('body').on('click', function () {
            if ($('.search-btn').hasClass('show-search-icon')) {
                $('.search-btn').removeClass("show-search-icon");
                $('.search-box').fadeOut(300);
            }
        });
    }
}

var handleGoogleMap = function (id) {
    if ($('#' + id).length > 0) {
        var myMarkers = {
            "markers": [{
                "latitude": "21.021953",		// latitude
                "longitude": "105.860057",		// longitude
                "icon": "../img/mipec_map.png"	// Pin icon
            }]
        };

        $("#" + id).mapmarker({
            zoom: 18,							// Zoom
            center: "21.021953,105.860057",		// Center of map
            type: "ROADMAP",					// Map Type
            controls: "HORIZONTAL_BAR",			// Controls style
            dragging: true,							// Allow dragging?
            mousewheel: true,	// Allow zooming with mousewheel
            markers: myMarkers,
            styling: 0,							// Bool - do you want to style the map?
            featureType: "all",
            visibility: "on",
            elementType: "geometry",
            hue: "#00AAFF",
            saturation: -100,
            lightness: 0,
            gamma: 1,
            navigation_control: 0
        });
    }
}
function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-theVideo"),
            videoTitle = $(this).data("title"),
            videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal).find('.modal-header>.modal-title').html(videoTitle);
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
        $(theModal).on('hidden.bs.modal', function () {
            $(theModal + ' iframe').removeAttr('src');
        })
    });
}
var hideLocationMap = function (elm) {
    $('#' + elm).fadeOut();
}
var showLocationMap = function (elm) {
    $('.google_map_location').hide();
    $('#' + elm).fadeIn();
}
/*var marquee = $('p.marquee');
marquee.each(function () {
    var mar = $(this), indent = mar.width();
    mar.marquee = function () {
        indent--;
        mar.css('text-indent', indent);
        if (indent < -1 * mar.children('div.marquee-text').width()) {
            indent = mar.width();
        }
    };
    mar.data('interval', setInterval(mar.marquee, 1000 / 60));
});*/
var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    if ($animation_elements.length > 0) {
        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

var handleBacktoTop = function () {
    if (($(window).height() + 100) < $(document).height()) {
        if ($('#top-link-block').length > 0) {
            $('#top-link-block').removeClass('hidden').affix({
                // how far to scroll down before link "slides" into view
                offset: {top: 100}
            });
        }
    }
}
var down = false;
var wrapSlid = $('.pr-slider-wrap');
var currSlid = $('.pr-slider-wrap .slick-current');
var LastActSlid = $('.pr-slider-wrap .slick-active:last');
var FirstActSlid = $('.pr-slider-wrap .slick-active:first');
var slideback;
var slidego;
var lastIndex;
var firstIndex;
var pr_slid_timer;
var pr_resize_time;
var pr_odds_timer;
/*================================================*/
/*                  Switch button                 */
/*================================================*/
function pr_switch_btn() {
	if ($('.pr-switch').length) {
		$('.pr-switch').on('click', function (e) {
			e.stopPropagation();
			if ($(this).find('.pr-switch-circle').hasClass('pr-switch-circle-active')) {
				clearTimeout(pr_odds_timer);
				$(this).find('.pr-switch-circle').removeClass('pr-switch-circle-active');
				// hide row with odds
				// hide row with odds type
				pr_odds_timer = setTimeout(function () {
					$('.pr-odds-row').hide(300);
					$('.pr-main-odds').slideUp(200);
					// make less max-width for team name
					$('.pr-match-team-name').removeClass('pr-match-team-name-open');
					$('.pr-cup-link').removeClass('pr-cup-link-open');
					$('.pr-cup-link').removeClass('pr-cup-link-open');
					$('.pr-title-score-row').removeClass('pr-title-score-row-open');
					// add class for top border above odds
					$('.pr-main-content-row').find('.pr-match-row-right-wrap:first').removeClass('pr-match-row-right-wrap-active');
				}, 200);
			} else {
				clearTimeout(pr_odds_timer);
				$(this).find('.pr-switch-circle').addClass('pr-switch-circle-active');
				// show row with odds
				// hide row with odds type
				pr_odds_timer = setTimeout(function () {
					$('.pr-main-odds').slideDown(200);
					$('.pr-odds-row').delay(200).show(300);
					// make more max-width for team name
					$('.pr-match-team-name').addClass('pr-match-team-name-open');
					$('.pr-cup-link').addClass('pr-cup-link-open');
					$('.pr-title-score-row').addClass('pr-title-score-row-open');
					// remove class for top border above odds
					$('.pr-main-content-row').find('.pr-match-row-right-wrap:first').addClass('pr-match-row-right-wrap-active');
				}, 200)

				odds_click();
			}
		});
	}
}

function odds_click() {
	$('.pr-main-odds *').on('click', 'label', function () {
		if ($('.pr-main-odds input').is(':checked')) {
			$('.pr-main-odds').slideUp(200);
		}
	});
}

function oddsToggleShow() {
	if ($('.pr-match-row').length) {
		/*if(window.innerWidth >= 620){
		  $('.pr-match-row').find('.pr-match-row-right.active').removeClass('active');
		}
		if(window.innerWidth <= 620){
		  $('.pr-match-row').on('click', function(e){
		    if (e.target != this) {
		     return true;
		    }
		    $(this).find('.pr-match-row-right').addClass('active');
		  })
		}*/
	}
}


$('.pr-match-rows-wrap').on('click', '*', function (e) {
	if (e.target.nodeName.toLowerCase() !== 'i' && e.target.nodeName.toLowerCase() !== 'a') {
		var aside = $('.aside-right:not(.aside-right-default)');
		
		//open odds
		if (window.innerWidth <= 620) {
			$('.pr-match-row-right').removeClass('active');
			if (!$('.pr-match-row-right.active').length) {
				if ($(this).hasClass('pr-match-row-wrap')) {
					$(this).find('.pr-match-row-right').addClass('active');
				} else {
					$(this).closest('.pr-match-row').find('.pr-match-row-right').addClass('active');
				}
			}
			return false;
		}

		//open sidebar
		if (window.innerWidth <= 920 && window.innerWidth > 620) {
			aside.addClass('open');
			$(".nm-content-overlay").stop().fadeIn(200);
		}
	}

})

$(document).on("click", "*", function (e) {
	if ($('.pr-match-row-right.active').length) {
		$('.pr-match-row-right').removeClass('active');
	}
})

/* sidebar mob hide*/
$(".nm-content-overlay").on("click", function(){
	$(".nm-content-overlay").fadeOut(200);
	$('.aside-right:not(.aside-right-default)').removeClass('open');
})


$('.favorites-match-row').on('click', '*', function (e) {
	if (e.target.nodeName.toLowerCase() !== 'i' && e.target.nodeName.toLowerCase() !== 'a') {
		var aside = $('.pr-favorites-right:not(.pr-favorites-right-default)');

		//open sidebar
		if (window.innerWidth <= 920 && window.innerWidth > 620) {
			aside.addClass('open');
			$(".nm-content-overlay").stop().fadeIn(200);
		}
	}

})

/* sidebar mob hide*/
$(".nm-content-overlay").on("click", function(){
	$(".nm-content-overlay").fadeOut(200);
	$('.pr-favorites-right:not(.pr-favorites-right-default)').removeClass('open');
})

/*================================================*/
/*                Arrow for match row             */
/*================================================*/

function matchRow_arrow() {
	$('.pr-main-content-row .pr-arrow').on('click', function () {
		if ($('.pr-main-content-row').length && window.innerWidth <= 620) {
			$(this).toggleClass('active');
			$(this).closest('.pr-main-content-row').find('.pr-match-rows-wrap').slideToggle(200);
		}
	})
}

/*================================================*/
/*                Favorite button                 */
/*================================================*/
$('body').on('click', '.pr-favorite-btn, .pr-favorite-btn i', function (e) {
	e.stopPropagation();
	if ($(this).is("a")){
		if (!($(this).hasClass('pr-favorite-btn-active'))) {
			$(this).addClass('pr-favorite-btn-active');
			$(this).removeClass('pr-fvr-muted');
			$(this).siblings('.pr-dropdown-favorite').hide();
		}
	}
	if ($(this).is("i")){
		var nm_a = $(this).parent("a");
		if (!nm_a.hasClass('pr-favorite-btn-active')) {
			nm_a.addClass('pr-favorite-btn-active');
			nm_a.removeClass('pr-fvr-muted');
			nm_a.siblings('.pr-dropdown-favorite').hide();
		}
	}
});

$('.pr-dropdown-favorite .pr-remove').on('click', function () {
	$(this).closest('.pr-dropdown-favorite').hide();
	$(this).closest('.pr-dropdown-favorite').siblings('.pr-favorite-btn').removeClass('pr-favorite-btn-active');
});
$('.pr-dropdown-favorite .pr-mute').on('click', function () {
	$(this).closest('.pr-dropdown-favorite').hide();
	$(this).closest('.pr-dropdown-favorite').siblings('.pr-favorite-btn').addClass('pr-fvr-muted').removeClass('pr-favorite-btn-active');
});

/*================================================*/
/*           Tournament-leftcol button            */
/*================================================*/

//Above

$('.pr-dropdown-time-period li').on('click', function () {
    var textLi = $(this).children('span').text();
    $(this).parents('.pr-time-period-btn').children('.active').text(textLi);

    $('.pr-time-period-btn .active.nm-toggler').removeClass('open');
    $(this).parents('.pr-dropdown-time-period').fadeOut(200);
});

$('.pr-dropdown-time-period li:first').hover(
    function () {
       $(this).parent().addClass('first-hover');
    },
    function () {
        $(this).parent().removeClass('first-hover');
    }
);

$('.above-content-block-homepage .pr-favorite-container .pr-dropdown-favorite .pr-remove').on('click', function () {
	$(this).closest('.pr-favorite-container').children('.pr-favorite-btn').addClass('default-btn')
});

$('.above-content-block-homepage .pr-favorite-btn').on('click', function () {
	$(this).removeClass('default-btn');
});

//Progressbar

$('.progressbar li').hover(
    function () {
        $(this).children('span').addClass('open');
        $(this).addClass('show');
        $(this).children('.nm-dropdown').fadeIn(200);
    },
    function () {
        $(this).children('span').removeClass('open');
        $(this).removeClass('show');
        $(this).children('.nm-dropdown').fadeOut(200);
    }
);

//Slider
var weekArr = [];
for (var i = 1; i < 53; i++) {
    weekArr.push(i);
}

var week = $('.week-slider .current-week').text();

//Function for removing ul's content
var removeAllLiInUl = function( ul ) {
    ul.children('li').each(function () {
        $(this).remove();
    });
};

//Function for adding class active on li
var activeLi = function() {
    $('.week-slider .nm-dropdown ul li').each(function () {
        if ( parseFloat(week) == $(this).text() ){
            $(this).addClass('active');
            if ($(window).width() > 1300 && $(this).text() >= 10 ){
                $(this).css('padding-right', '1px')
			} else if ($(window).width() < 1300 && $(this).text() >= 10) {
                $(this).css('padding-left', '1px')
			}
        } else {
            $(this).removeClass('active').css({
				'padding-right': '',
				'padding-left': ''
			})
        }
    });
};

//Function for adding new content in ul
var sliderContentRestart = function() {
    for ( var j = 0; j < weekArr.length; j++ ) {
        if ( week == weekArr[j] ) {
            removeAllLiInUl($('.week-slider .nm-dropdown ul'));
            for ( var k = 0; k < 7; k++ ) {
                $('.week-slider .nm-dropdown ul').append('<li>' + weekArr[j-1+k] + '</li>')
            }
        }
    }
    activeLi();
};

//First activation function sliderContentRestart()
sliderContentRestart();

$(window).resize(function () {
    sliderContentRestart()
});

//Slider choose week
$('.week-slider .nm-dropdown ul').on('click', 'li', function (e) {
    e.stopPropagation();
    var value = $(this).text();
    $('.week-slider .current-week').text(' ' + value);
    week = value;

    activeLi();
    $('.week-slider .nm-dropdown').removeClass('show').fadeOut(200);
    $('.week-slider .nm-toggler').removeClass('open');

    console.log($(window).width())
});

//Slider default click
$('.week-slider .nm-dropdown ul').on('click', function (e) {
   e.stopPropagation();
});

//Slider btn-prev
$('.week-slider .prev').on('click',function (e) {
   e.preventDefault();
   e.stopPropagation();
   var currentValue = $('.week-slider .nm-dropdown ul li:first').text();
   var prevValue = currentValue-1;

    for ( var l = 1; l <= weekArr.length; l++ ){
        if ( prevValue == l ) {
            removeAllLiInUl($('.week-slider .nm-dropdown ul'));
            for ( var k = 0; k < 7; k++ ) {
                $('.week-slider .nm-dropdown ul').append('<li>' + weekArr[l-1+k] + '</li>')
            }
        }
    }
    activeLi();
});

//Slider btn-next
$('.week-slider .next').on('click',function (e) {
    e.preventDefault();
    e.stopPropagation();
    var currentValue = $('.week-slider .nm-dropdown ul li:last').text();
    var nextValue = +currentValue+1;

    for ( var l = 1; l <= weekArr.length; l++ ){
        if ( nextValue == l ) {
            removeAllLiInUl($('.week-slider .nm-dropdown ul'));
            for ( var k = 0; k < 7; k++ ) {
                $('.week-slider .nm-dropdown ul').append('<li>' + weekArr[l-7+k] + '</li>')
            }
        }
    }
    activeLi();
});

//Slider click
$('.week-slider .nm-toggler').on('click', function (e) {
    e.stopPropagation();
    $(this).next().toggleClass('show');
});

$('body').on('click', function () {
    $('.week-slider .nm-dropdown').removeClass('show');
});

//Header-bottom on mobile version
var hideAllElementsInMain = function(){
    $('.pr-main-wrap.progress').addClass('hide');
    $('.pr-main-wrap.league-md.league-sm').addClass('hide');
    $('.pr-main-wrap.league-standing').addClass('hide');
    $('.pr-main-wrap.matches-sm').addClass('hide');
    $('.pr-main-wrap.top-scores-md').addClass('hide');
};

var LiActive = function ( elem ) {
    var allLiinNav = $('.nm-header-bottom li');
    allLiinNav.removeClass('active');
    elem.addClass('active');
};

$('.nm-header-bottom .summary-btn').on('click', function () {
    hideAllElementsInMain();
    LiActive($(this));
    $('.pr-main-wrap.progress').removeClass('hide').addClass('show');
    $('.pr-main-wrap.league-md.league-sm').removeClass('hide').addClass('show');
});

$('.nm-header-bottom .standings-btn').on('click', function () {
    hideAllElementsInMain();
    LiActive($(this));
    $('.pr-main-wrap.league-standing').removeClass('hide').addClass('show');
    $('.pr-main-wrap.matches-sm').removeClass('hide').addClass('show');
});

$('.nm-header-bottom .team-btn').on('click', function () {
    hideAllElementsInMain();
    LiActive($(this));
    $('.pr-main-wrap.top-scores-md').removeClass('hide').addClass('show');
    $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(0)').show();
    $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(1)').hide();
});

$('.nm-header-bottom .media-btn').on('click', function () {
    hideAllElementsInMain();
    LiActive($(this));
    $('.pr-main-wrap.top-scores-md').removeClass('hide').addClass('show');
    $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(0)').hide();
    $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(1)').show();
});

$(window).on('resize', function () {
	if ($(this).width() > 569){
        $('.pr-main-wrap.progress').removeClass('hide show');
        $('.pr-main-wrap.league-md.league-sm').removeClass('hide show');
        $('.pr-main-wrap.league-standing').removeClass('hide show');
        $('.pr-main-wrap.matches-sm').removeClass('hide show');
        $('.pr-main-wrap.top-scores-md').removeClass('hide show');
        $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(0)').show();
        $('.pr-main-wrap.top-scores-md .aside-right-wrapper:eq(1)').show();
        LiActive($('.nm-header-bottom .summary-btn'))
	}
});


//Block matches-sm - opening pr-favotites-right on click
$('.pr-main-wrap.matches-sm .pr-match-row').on('click', function () {

    if ( $(window).width() > 849) {
        console.log($(".nm-content-overlay").delay(1000).css('display'));
        setTimeout(function () {
            $(".nm-content-overlay").hide();
            $('.pr-main.favorites').css('z-index','0');
            $('.pr-favorites-right.pr-favorites-scrollable').removeClass('open');
            $('.pr-main-wrap.matches-sm .aside-right.nm-block').removeClass('open');
        },5)
    }

    if ($(window).width() <= 869) {
        $('.pr-main.favorites').css('z-index','auto');
    }

    if ( $(window).width() <= 620 && $(window).width() >= 553 ){
        $('.nm-content-overlay').fadeIn(200);
        $('.pr-favorites-right.pr-favorites-scrollable').addClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').addClass('open');
    } else {
        $('.nm-content-overlay').fadeOut(200);
        $('.pr-favorites-right.pr-favorites-scrollable').removeClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').removeClass('open');
    }
});

$('.nm-content-overlay').on('click', function () {
    $('.pr-main.favorites').css('z-index','');
});

//BTN - DISPLAY in mobile version

// Checking for correlation two tabs

$('.pr-main .nm-tab-dropdown .nm-dropdown li a').on('click', function () {
   var text = $(this).text().toLowerCase();
   var tabAllLi = $('.nm-tabs-list-mobile > ul li');

    tabAllLi.each(function () {
        $(this).removeClass('active');

       if ( $(this).text().toLowerCase() == text ) {
           $(this).addClass('active');
       }
    });

    $('.pr-main .nm-tab-dropdown .nm-toggler').removeClass('open');
    $('.pr-main .nm-tab-dropdown .nm-dropdown').fadeOut(200);
});

// //Choosing the need li

$('.nm-tabs-list-mobile > ul li').on('click', function () {
   var text = $(this).text().toLowerCase();
   var dropAllLi = $('.pr-main .nm-tab-dropdown .nm-dropdown li');

    dropAllLi.each(function () {
        $(this).removeClass('active');

        if ( $(this).text().toLowerCase() == text ) {
            $(this).addClass('active');
        }
    });
});





/*================================================*/
/*              Redraw Blure sections             */
/*================================================*/
function newsRedraw() {
	if (window.innerWidth > 1200) {
		wrapSlid.find(currSlid).addClass('pr-blur-slide pr-left-blur');
		wrapSlid.find(LastActSlid).addClass('pr-blur-slide pr-right-blur');
	}
	if (window.innerWidth <= 1200 && window.innerWidth >= 998) {
		wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
		wrapSlid.find(FirstActSlid).prev().addClass('pr-blur-slide pr-left-blur');
		wrapSlid.find(LastActSlid).next().addClass('pr-blur-slide pr-right-blur');
	}
	if (window.innerWidth < 998) {
		wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
	}
};


/*================================================*/
/*            Action on click blur slide          */
/*================================================*/
function blurClick() {
	lastIndex = $('.slick-slide:last').data('slick-index');
	firstIndex = $('.slick-slide:first').data('slick-index');
	$('body').on('click', '.pr-left-blur', function () {
		if (window.innerWidth >= 998) {
			clearTimeout(pr_slid_timer);
			wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
			if (window.innerWidth > 1200) {
				slidego = $('.pr-slider-wrap .slick-current').data('slick-index') - 4;
			} else if (window.innerWidth <= 1200) {
				slidego = $('.pr-slider-wrap .slick-current').data('slick-index') - 2;
			}

			if (slidego <= (firstIndex + 1)) {
				$('.pr-slider-wrap').slick('slickGoTo', (lastIndex - 6));
			} else {
				$('.pr-slider-wrap').slick('slickGoTo', slidego);
			}

			pr_slid_timer = setTimeout(function () {
				wrapSlid = $('.pr-slider-wrap');
				wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
				currSlid = $('.pr-slider-wrap .slick-current');
				LastActSlid = $('.pr-slider-wrap .slick-active:last');
				FirstActSlid = $('.pr-slider-wrap .slick-active:first');
				if (window.innerWidth > 1200) {
					slidego = $('.pr-slider-wrap .slick-current').data('slick-index') - 4;
				} else {
					slidego = $('.pr-slider-wrap .slick-current').data('slick-index') - 2;
				}
				newsRedraw();
			}, 300)
		}
	});

	$('body').on('click', '.pr-right-blur', function () {
		if (window.innerWidth >= 998) {
			clearTimeout(pr_slid_timer);
			wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
			if (window.innerWidth > 1200) {
				slidego = $('.pr-slider-wrap .slick-current').data('slick-index') + 4;
			} else if (window.innerWidth <= 1200) {
				slidego = $('.pr-slider-wrap .slick-current').data('slick-index') + 2;
			}
			if (slidego >= lastIndex) {
				$('.pr-slider-wrap').slick('slickGoTo', firstIndex);
			} else {
				$('.pr-slider-wrap').slick('slickGoTo', slidego);
			}
			pr_slid_timer = setTimeout(function () {
				wrapSlid = $('.pr-slider-wrap');
				wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide pr-right-blur pr-left-blur');
				currSlid = $('.pr-slider-wrap .slick-current');
				LastActSlid = $('.pr-slider-wrap .slick-active:last');
				FirstActSlid = $('.pr-slider-wrap .slick-active:first');
				if (window.innerWidth > 1200) {
					slidego = $('.pr-slider-wrap .slick-current').data('slick-index') + 4;
				} else {
					slidego = $('.pr-slider-wrap .slick-current').data('slick-index') + 2;
				}
				newsRedraw();
			}, 300)
		}
	})
};

// Animate scroll to top button
$("a.pr-to-top").click(function () {
	$("html, body").animate({
		scrollTop: 0
	}, "slow");
	return false;
});

$(document).ready(function () {
	pr_switch_btn();
	oddsToggleShow();
	matchRow_arrow();

	/*================================================*/
	/*                      Slider                    */
	/*================================================*/
	if ($('.pr-slider-wrap').length) {
		$('.pr-slider-wrap').slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			speed: 300,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 1600,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 1,
						infinite: true,
					}
      },
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						centerPadding: '105px',
						centerMode: true,
					}
      },
				{
					breakpoint: 998,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						centerPadding: '100px',
					}
      },
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						centerMode: false,
					}
      },
				{
					breakpoint: 620,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
      },
    ]
		});
		down = false;
		wrapSlid = $('.pr-slider-wrap');
		currSlid = $('.pr-slider-wrap .slick-current');
		LastActSlid = $('.pr-slider-wrap .slick-active:last');
		FirstActSlid = $('.pr-slider-wrap .slick-active:first');
		$('.pr-slider-wrap').on('swipe', function (event, slick, direction) {
			wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide');
			wrapSlid = $('.pr-slider-wrap');
			currSlid = $('.pr-slider-wrap .slick-current');
			LastActSlid = $('.pr-slider-wrap .slick-active:last');
			FirstActSlid = $('.pr-slider-wrap .slick-active:first');
			newsRedraw();
		});

		newsRedraw();
		/*================================================*/
		/*                 Drag and drop slider           */
		/*================================================*/
		$('.pr-slider-wrap *').on('mousedown touchstart', function (e) {
			down = true;
		})
		$('.pr-slider-wrap *').on('mouseup touchend', function (e) {
			down = false;
			newsRedraw();
		})
		$('.pr-slider-wrap *').on('mousemove touchmove', function (e) {
			if (down) {
				wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide');
			}
		})
		if ($('.pr-new-wrap').length > 6) {
			blurClick();
		}
	}
})

/*================================================*/
/*                     Resize                     */
/*================================================*/

$(window).resize(function () {
	oddsToggleShow();
	clearTimeout(pr_resize_time);
	pr_resize_time = setTimeout(function () {
		wrapSlid = $('.pr-slider-wrap');
		currSlid = $('.pr-slider-wrap .slick-current');
		LastActSlid = $('.pr-slider-wrap .slick-active:last');
		FirstActSlid = $('.pr-slider-wrap .slick-active:first');
		wrapSlid.find('.pr-new-wrap').removeClass('pr-blur-slide');
		newsRedraw();
	}, 300);
});


/*================================================*/
/*                  Read more button              */
/*================================================*/
$('body').on('click', '.sr-more-btn', function (e) {
    e.stopPropagation();
    if ($(this).is("a")){
        if (!($(this).hasClass('sr-more-btn-active'))) {
            $(this).addClass('sr-more-btn-active');
        } else {
        	$(this).removeClass('sr-more-btn-active')
		}
    }
})

/*================================================*/
/*                 Search result tabs             */
/*================================================*/
$(function() {

	$('ul.sr-tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.sr-mobile-tabs').find('div.sr-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

});
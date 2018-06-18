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


$('.favorites-match-row:not(.league-standing .favorites-match-row)').on('click', '*', function (e) {
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
/*          		 Tournament-page           */
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
        $(this).children('.nm-dropdown').show();
    },
    function () {
        $(this).children('span').removeClass('open');
        $(this).removeClass('show');
        $(this).children('.nm-dropdown').hide();
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
var hideAllElementsInMain = function () {
    $('.bmenu .pr-main-wrap').each(function () {
       $(this).addClass('hide').removeClass('show');
       $(this).find('.block').addClass('hide').removeClass('show');
    });
};

var LiActive = function ( elem ) {
    var allLiInNav = $('.nm-header-bottom li');
    allLiInNav.removeClass('active');
    elem.addClass('active');
};

$('.bmenu .nm-header-bottom li').on('click', function () {
   var dataClasses = $(this).attr('data-tab');
   var dataClassesArr = dataClasses.split(',');

    hideAllElementsInMain();

    LiActive( $(this) );

    dataClassesArr.forEach( function (elem) {
        console.log( elem );
        $('.pr-main-wrap.' + elem).removeClass('hide').addClass('show');
        $('.pr-main-wrap .' + elem).removeClass('hide').addClass('show');
    } )

});

//Block matches-sm - opening pr-favotites-right on click
$('.bblock .pr-main-wrap.matches-sm .pr-match-row .pr-match-row-left').on('click', function () {

    $('.pr-main.favorites').css('z-index','auto');
    $('.pr-main-wrap.matches-sm').css('z-index','auto');

    if ( $(window).width() > 1169) return false;

    if ( $(window).width() <= 1169 && $(window).width() >= 553 ){
        $('.nm-content-overlay').fadeIn(200);
        $('.pr-favorites-right.pr-favorites-scrollable').addClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').addClass('open');
    } else {
        $('.nm-content-overlay').fadeOut(200);
        $('.pr-favorites-right.pr-favorites-scrollable').removeClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').removeClass('open');
    }

});

//Block matches-sm - opening pr-favotites-right on click
$('.mblock .pr-main-wrap.matches-sm .pr-match-row .pr-match-row-left').on('click', function () {

    $('.pr-main.favorites').css('z-index','auto');

    if ( $(window).width() > 849) return false;

    if ( $(window).width() <= 849 && $(window).width() >= 553 ){
        $('.nm-content-overlay').fadeIn(200);
        $('.pr-favorites-right.pr-favorites-scrollable').addClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').addClass('open');
    } else {
        $('.nm-content-overlay').fadeOut(200);
        $('.pr-favorites-right.pr-favorites-scrollable').removeClass('open');
        $('.pr-main-wrap.matches-sm .aside-right.nm-block').removeClass('open');
    }

});

$('.pr-main-wrap.league-standing .pr-match-row .pr-match-row-left').on('click', function () {
    if ( $(window).width() > 480 ) return false;
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

// Choosing the need li

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
/*          		 Team-page           */
/*================================================*/

//division-dropdown-btn

//Matched blocks width in division-dropdown-btn

function divisionDropdownBtnWidth( list ,selected ) {
    var divisionDropDownSelected = selected.width();
    var divisionDropDownSelectedPL = selected.css('padding-left');
    var divisionDropDownSelectedPR = selected.css('padding-right');
    var divisionDropDownSelectedWidth = divisionDropDownSelected + parseFloat(divisionDropDownSelectedPL) + parseFloat(divisionDropDownSelectedPR);

    list.width(divisionDropDownSelectedWidth);
}

divisionDropdownBtnWidth( $('.league-standing .division-dropdown-list') ,$('.league-standing .division-dropdown-selected') );
divisionDropdownBtnWidth( $('.aside-right .division-dropdown-list') ,$('.aside-right .division-dropdown-selected') );

//Select need text

$('.division-dropdown-list li').on('click', function (e) {
	e.preventDefault();

	var needText = $(this).text();
	$(this).parents('.division-dropdown-list').prev('.division-dropdown-selected').text(needText);

    removeActiveinLi( $(this).parent().children('li') );

    $(this).addClass('active');

    divisionDropdownBtnWidth( $(this).parents('.division-dropdown-list') ,$(this).parents('.division-dropdown-list').prev('.division-dropdown-selected') );
});

//Remove class active in li
function removeActiveinLi( html ) {
	html.each(function () {
		$(this).removeClass('active')
    })
};

//Form progress block

$('.form-progress-wrapper .nm-toggler').hover(
	function () {
        var dropDown = $(this).parents('.form-progress-wrapper__progressbar').children('.nm-dropdown');
		$(this).addClass('open');
        dropDown.addClass('show').show();
        if ( $(this).hasClass('progress-loss') ) dropDown.addClass('top')
    },
	function(){
        var dropDown = $(this).parents('.form-progress-wrapper__progressbar').children('.nm-dropdown');
        $(this).removeClass('open');
        dropDown.removeClass('show').removeClass('top').hide();
	}
);

$('.form-progress-wrapper .nm-toggler').on('click', function () {
    var dropDown = $(this).parents('.form-progress-wrapper__progressbar').children('.nm-dropdown');
    dropDown.toggle();
});

//Circle progressbar
console.dir(document.getElementById('canvas-foreign'));

$(window).on('load', function () {

	if ( $('.main-wrapper').hasClass('team') ) {
        var can1 = document.getElementById('canvas-foreign'),
            c1 = can1.getContext('2d'),
            can2 = document.getElementById('canvas-national'),
            c2 = can2.getContext('2d'),
            foreignText = $('.structure-wrapper__foreign .canvas-bar__context span:first').text(),
            nationalText = $('.structure-wrapper__national .canvas-bar__context span:first').text(),
            total = $('.structure-wrapper__total span:first').text();


        var pos1X = can1.width / 2,
            pos1Y = can1.height / 2,
            pos2X = can2.width / 2,
            pos2Y = can2.height / 2,
            fps = 1000 / 200,
            oneProcent = 360 / 100,
            result1 = oneProcent * (foreignText / total) * 100,
            result2 = oneProcent * (nationalText / total) * 100;

        c1.lineCap = 'round';
        c2.lineCap = 'round';

        arcMove( c1, pos1X, pos1Y, result1 );
        arcMove( c2, pos2X, pos2Y, result2 );

        function arcMove( c ,posX, posY, result ){
            var deegres = 0;
            var acrInterval = setInterval (function() {
                deegres += 1;
                c.beginPath();
                c.fillStyle = '#d0d1d2';
                c.arc( posX, posY, 17, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
                c.lineTo(posX, posY);
                c.fill();
                if( deegres >= result ) clearInterval(acrInterval);
            }, fps);
        }
	}
});

//Append blocks for tablet version

$(window).on('load', function () {
    if ( $(window).width() <= 768 ) {
        createTablteBlocks();
    }

    if ( $(window).width() <= 555 ) {
        createMobile();
    }
});

function createTablteBlocks() {
    $('.team main').append('<div class="pr-main-wrap mobile">');

    var block1 = $('aside.aside-right.aside-right-default.nm-block .block1'),
        block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block3 = $('aside.aside-right.aside-right-default.nm-block .block3'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4'),
        block5 = $('aside.aside-right.aside-right-default.nm-block .block5'),
		players = $('.pr-main-wrap.players');

    console.log(block2)

    $('.team main .pr-main-wrap.mobile').append( '<aside class="aside-right aside-right-default nm-block">' );

    // $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block').append( block4 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block').append( block5 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block').append( '<div class="half-box half-box-left">' );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block').append( '<div class="half-box half-box-right">' );

    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first').append( block1 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first').append( block3 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first').append( players );

    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block2 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block4 );
}

//Append blocks to mobile version
$(window).on('resize', function () {
	if ( $(window).width() <= 555 ) {
        createMobile();
	} else if ( $(window).width() >=556 && $(window).width() <= 768 ) {
        createMobileBack();
	}
});

function createMobile() {
    var block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4');
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first .block1').after(block2);
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first .players').after( block4 );
}

function createMobileBack() {
    var block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4');
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block2 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block4 );
}


//Clipping text

function clippingText( html, count ) {
    html.each(function () {
        var htmlText = $(this).text();
        if ( htmlText.length > count ){
            var result = htmlText.slice(0, count) + '.';
            $(this).text( result );
        }
    })
};

//Clipping text in players block

$(window).on('load',function () {
    if ( $(window).width() <= 768 ) {
        clippingText( $('.team-player-box-mobile__position span'), 7);
    }
});

$(window).on('resize',function () {
    if ( $(window).width() <= 768 ) {
        clippingText( $('.team-player-box-mobile__position span'), 7);
    }
});

/*================================================*/
/*          		 Cup-page           */
/*================================================*/

//Draw box

// Choose winner team
$('.draw-wrap .match').hover(
    function () {
        var teamNameMatchesArr = $('.participant .team-name');
        $(this).find('.team-name').each(function () {
            var currentText = $(this).text();

            teamNameMatchesArr.each(function () {
                if ( $(this).text() == currentText ) $(this).parents('.participant').addClass('show-bcg')
            });
        });
    },
    function () {
        var teamNameMatchesArr = $('.participant .team-name');
        $(this).find('.team-name').each(function () {
            var currentText = $(this).text();

            teamNameMatchesArr.each(function () {
                if ( $(this).text() == currentText ) $(this).parents('.participant').removeClass('show-bcg')
            });
        });
    }
);

// Viewport block height

function viewportHeightResize() {
    $('.viewport').each(function () {
        var countBlocksInViewport = $(this).find('.matches').length;
        var viewportPadTop = $(this).find('.round.first-round').css('padding-top');
        var viewportPadBottom = $(this).find('.round.first-round').css('padding-bottom');
        var viewportHeight = 98 * +countBlocksInViewport + (+countBlocksInViewport-1) * 12 + parseFloat(viewportPadTop) + parseFloat(viewportPadBottom);
        return $('.viewport').css('height', viewportHeight);
    });
}

$(window).on('load', function () {
    viewportHeightResize()
});

$('.draw-wrap .nm-tabs-list a').on('click', function (e) {
   e.preventDefault();
    viewportHeightResize();
});

// Slider in rounds

var countClickNext = 0;
var countClickPrev = 0;

var countRounds = function () {
    $('.viewport-head ul').css({'left': '0'});
    $('.playoff.scroll .overview').css({'left': '0'});

    countClickPrev = 0;

    var widthBoxScrollBody = $('.playoff.scroll .nm-tabs-content').width();
    var lengthBoxScrollBody = $('.playoff.scroll .nm-tab-content.active .round').length;
    var countShownBlocks = Math.floor(widthBoxScrollBody/155);

    countClickNext = lengthBoxScrollBody - countShownBlocks;
    console.log(countClickPrev, countClickNext, widthBoxScrollBody, lengthBoxScrollBody, countShownBlocks);
};

$('.playoff-header .btn-next').on('click', function (e) {
    e.preventDefault();

    if ( countClickNext > 0 ) {
        $('.viewport-head ul').animate({'left': '-=155px'});
        $('.playoff.scroll .overview').animate({'left': '-=155px'});

        countClickNext--;
        countClickPrev++;
        console.log(countClickNext);
        console.log(countClickPrev);
    } else {
        return false
    }
});

$('.playoff-header .btn-prev').on('click', function (e) {
    e.preventDefault();

    if ( countClickPrev > 0 ) {
        $('.viewport-head ul').animate({'left': '+=155px'});
        $('.playoff.scroll .overview').animate({'left': '+=155px'});

        countClickNext++;
        countClickPrev--;
        console.log(countClickNext);
        console.log(countClickPrev);
    } else {
        return false
    }
});


$(window).on('load', function () {
    countRounds();
});

$(window).on('resize', function () {
    countRounds();
});

$('.standings-btn').on('click', function () {
    countRounds();
});

$('.nm-tabs-list a').on('click', function (e) {
    e.preventDefault();
    countRounds();
});

// Change place to block draw-wrap on tablet version

function changePlace() {
   var drawWrap = $('.pr-main-wrap.draw-wrap');
   var leagueStanding = $('.pr-main-wrap.league-standing');
    leagueStanding.before(drawWrap);
}

$(window).on('load', function () {
    if ( $(window).width() < 1169 ) {
        changePlace();
    }
});

$(window).on('resize', function () {
    if ( $(window).width() < 1169 ) {
        changePlace();
    }
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
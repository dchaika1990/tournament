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
		$('.pr-switch:not(#pr-switch)').on('click', function (e) {
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
    $('html, body').animate({scrollTop: 0},100);

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
    console.log(divisionDropDownSelectedWidth);

    list.width(divisionDropDownSelectedWidth);
}

$('.league-standing .division-dropdown').on('click', function () {
    divisionDropdownBtnWidth( $(this).children('.division-dropdown-list') ,$(this).children('.division-dropdown-selected') );
});

$('.aside-right .division-dropdown').on('click', function () {
    divisionDropdownBtnWidth( $(this).children('.division-dropdown-list') ,$(this).children('.division-dropdown-selected') );
});


$('.s-main__dropdown-left .division-dropdown').on('click', function () {
    divisionDropdownBtnWidth( $(this).children('.division-dropdown-list') ,$(this).children('.division-dropdown-selected') );
});

$('.s-main__dropdown-right .division-dropdown').on('click', function () {
    divisionDropdownBtnWidth( $(this).children('.division-dropdown-list') ,$(this).children('.division-dropdown-selected') );
});

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
// console.dir(document.getElementById('canvas-foreign'));

$(window).on('load', function () {

	if ( $('.main-wrapper').hasClass('team') ) {
        var can1 = document.getElementById('canvas-foreign');
            // console.log(can1);
            if ( !can1 ) return false;
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
        createTablteBlocksTeam();
    }

    if ( $(window).width() <= 555 ) {
        createMobileTeam();
    }
});



function createTablteBlocksTeam() {
    $('.team main:not(.player main)').append('<div class="pr-main-wrap mobile">');

    var block1 = $('aside.aside-right.aside-right-default.nm-block .block1'),
        block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block3 = $('aside.aside-right.aside-right-default.nm-block .block3'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4'),
        block5 = $('aside.aside-right.aside-right-default.nm-block .block5'),
		players = $('.pr-main-wrap.players');

    console.log(block2)

    $('.team main .pr-main-wrap.mobile').append( '<aside class="aside-right aside-right-default nm-block">' );

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
        createMobileTeam();
	} else if ( $(window).width() >=556 && $(window).width() <= 768 ) {
        createMobileTeamBack();
	}
});

function createMobileTeam() {
    var block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4');
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first .block1').after(block2);
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:first .players').after( block4 );
}

function createMobileTeamBack() {
    var block2 = $('aside.aside-right.aside-right-default.nm-block .block2'),
        block4 = $('aside.aside-right.aside-right-default.nm-block .block4');
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block2 );
    $('.team main .pr-main-wrap.mobile .aside-right-default.nm-block .half-box:eq(1)').append( block4 );
}


//Clipping text

function clippingText( html, count, tag ) {
    html.each(function () {
        var htmlText = $(this).text();
        if ( htmlText.length > count ){
            var result = htmlText.slice(0, count) + tag;
            $(this).text( result );
        }
    })
};

//Clipping text in players block

$(window).on('load',function () {
    if ( $(window).width() <= 768 ) {
        clippingText( $('.team-player-box-mobile__position span'), 7, '.');
    }
});

$(window).on('resize',function () {
    if ( $(window).width() <= 768 ) {
        clippingText( $('.team-player-box-mobile__position span'), 7, '.');
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
    // console.log(countClickPrev, countClickNext, widthBoxScrollBody, lengthBoxScrollBody, countShownBlocks);
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
/*              Player Page             */
/*================================================*/

// Chart pentagon

$('#pr-switch').on('click', function (e) {
    e.preventDefault();
    $('.chart-container .team-skills').toggleClass('active');
    $(this).find('.pr-switch-circle').toggleClass('pr-switch-circle-active');
});

// Move blocks on tablet version

var key = 0;

function createLaptopBlocksPlayer() {

    if ( !key ) {
        var blockStats = $('aside.aside-right.aside-right-default.nm-block .block1'),
            blockMedia = $('aside.aside-right.aside-right-default.nm-block .block2');

        $('.player main .pr-main-wrap.stats-wrap').append( '<div class="aside-right aside-right-default nm-block">' );
        $('.player main .pr-main.media-wrap').append( '<div class="aside-right aside-right-default nm-block">' );

        $('.player main .pr-main-wrap.stats-wrap .aside-right').append( blockStats.clone() );
        $('.player main .pr-main.media-wrap .aside-right').append( blockMedia.clone() );

        key++;
    }

}


// Move blocks from laptop version to tablet

function createTabletBlocksSkills() {
    if ( $('.pr-main-wrap.player-skills .pr-main__block-left').html() || $('.pr-main-wrap.player-skills .pr-main__block-right').html() ) return false;
    var attributes = $('.player-skills .pr-main.attributes'),
        position = $('.player-skills .pr-main.position'),
        props = $('.player-skills .pr-main.props'),
        mediaWrap = $('.player-skills .pr-main.media-wrap');

    $('.pr-main-wrap.player-skills').append('<div class="pr-main__block-left">');
    $('.pr-main-wrap.player-skills').append('<div class="pr-main__block-right">');

    $('.pr-main-wrap.player-skills .pr-main__block-left').append(mediaWrap).append(position);
    $('.pr-main-wrap.player-skills .pr-main__block-right').append(attributes).append(props);
}

function createTabletBlocksSkillsBack() {
    if ( $('.player-skills > .pr-main.attributes').html() ) return false;

    console.log('this');

    var attributes = $('.player-skills .pr-main.attributes'),
        position = $('.player-skills .pr-main.position'),
        props = $('.player-skills .pr-main.props'),
        mediaWrap = $('.player-skills .pr-main.media-wrap');

    $('.pr-main-wrap.player-skills').append(attributes).append(position).append(props).append(mediaWrap);

    $('.pr-main__block-left').remove();
    $('.pr-main__block-right').remove();
}

// Move blocks from tablet version to mobile

// On resize
function createMobileVersionResize() {
    if ( $('.player.empty-page').html() ) return false;

    if ( !($('.player main .pr-main-wrap.player-profile').html()) ){
        var profile = $('.above-wrapper .pr-main-wrap.player-profile'),
            videos = $('.pr-main-wrap.player-skills .pr-main.media-wrap'),
            position = $('.pr-main-wrap.player-skills .pr-main.position'),
            attributes = $('.pr-main-wrap.player-skills .pr-main.attributes'),
            props = $('.pr-main-wrap.player-skills .pr-main.props');

        $('.player main').append(profile);
        $('.player main .pr-main-wrap.player-skills').append(videos.addClass('block')).append(position.addClass('block')).append(attributes.addClass('block')).append(props.addClass('block'));

        $('.pr-main__block-left').remove();
        $('.pr-main__block-right').remove();

        var statsBlock1 = $('#statsBlock1'),
            statsBlock2 = $('#statsBlock2'),
            statsBlock3 = $('#statsBlock3'),
            statsBlock4 = $('#statsBlock4'),
            statsBlock5 = $('#statsBlock5'),
            statsBlock6 = $('#statsBlock6'),
            statsBlock7 = $('#statsBlock7');
        $('.pr-main-wrap.stats-wrap .s-main').append(statsBlock1).append(statsBlock2).append(statsBlock3).append(statsBlock4).append(statsBlock5).append(statsBlock6).append(statsBlock7)
        $('.s-main__stats-block__tablet').remove();

        $('.pr-main-wrap.player-skills .pr-main').each(function () {
            $(this).addClass('block');
        })
    }
}

function createMobileVersionBack() {
    $('.player main .pr-main-wrap.player-skills .pr-main').each(function () {
        $(this).removeClass('block');
    });


    if ( !($('.above-wrapper .pr-main-wrap.player-profile').html()) ) {
        var profileBack = $('.pr-main-wrap.player-profile');
        $('.above-wrapper').append(profileBack);
        console.log('profileBack')
    }
}

// On load

function createMobileVersionLoad() {
    if ( $('.player.empty-page').html() ) return false;

    createLaptopBlocksPlayer();

    $('.pr-main-wrap.player-skills .pr-main').each(function () {
        $(this).addClass('block');
    });

    if ( !($('.player main .pr-main-wrap.player-profile').html()) ) {
        var profile = $('.above-wrapper .pr-main-wrap.player-profile');
        $('.player main').append(profile);
        console.log('profile')
    }
}

// Create three blocks in block Stats

function divideOnThree(){
    if ( $('.s-main__stats-block').html() ) {
        return false;
    }

    var statsBlock1 = $('#statsBlock1'),
        statsBlock2 = $('#statsBlock2'),
        statsBlock3 = $('#statsBlock3'),
        statsBlock4 = $('#statsBlock4'),
        statsBlock5 = $('#statsBlock5'),
        statsBlock6 = $('#statsBlock6'),
        statsBlock7 = $('#statsBlock7');

    $('.aside-right.aside-right-default.nm-block .block1 .s-main').append('<div class="s-main__stats-block">');
    $('.aside-right.aside-right-default.nm-block .block1 .s-main').append('<div class="s-main__stats-block">');
    $('.aside-right.aside-right-default.nm-block .block1 .s-main').append('<div class="s-main__stats-block">');

    $('.block1 .s-main .s-main__stats-block:eq(0)').append(statsBlock1).append(statsBlock2).append(statsBlock3);
    $('.block1 .s-main .s-main__stats-block:eq(1)').append(statsBlock6).append(statsBlock5);
    $('.block1 .s-main .s-main__stats-block:eq(2)').append(statsBlock4).append(statsBlock7);

    $('.s-main__stats-block__tablet').remove();
}

function divideOnThreeBack() {
    if ( $('aside.aside-right.aside-right-default.nm-block .block1 .s-main__stats-block') ) {
        var blockStats = $('aside.aside-right.aside-right-default.nm-block .block1 .s-main'),
            statsBlock1 = $('#statsBlock1'),
            statsBlock2 = $('#statsBlock2'),
            statsBlock3 = $('#statsBlock3'),
            statsBlock4 = $('#statsBlock4'),
            statsBlock5 = $('#statsBlock5'),
            statsBlock6 = $('#statsBlock6'),
            statsBlock7 = $('#statsBlock7');

        blockStats.append(statsBlock1).append(statsBlock2).append(statsBlock3).append(statsBlock4).append(statsBlock5).append(statsBlock6).append(statsBlock7);
    }

    $('.s-main__stats-block').remove();
}

// Create Two blocks in block Stats

function divideOnTwo() {
    if ( $('.s-main__stats-block__tablet').html() ) {
        return false;
    }

    var statsBlock1 = $('#statsBlock1'),
        statsBlock2 = $('#statsBlock2'),
        statsBlock3 = $('#statsBlock3'),
        statsBlock4 = $('#statsBlock4'),
        statsBlock5 = $('#statsBlock5'),
        statsBlock6 = $('#statsBlock6'),
        statsBlock7 = $('#statsBlock7');

    $('.aside-right-wrapper.block1 .s-main').append('<div class="s-main__stats-block__tablet">');
    $('.aside-right-wrapper.block1 .s-main').append('<div class="s-main__stats-block__tablet">');

    $('.block1 .s-main .s-main__stats-block__tablet:eq(0)').append(statsBlock1).append(statsBlock2).append(statsBlock5).append(statsBlock4);
    $('.block1 .s-main .s-main__stats-block__tablet:eq(1)').append(statsBlock3).append(statsBlock6).append(statsBlock7);

    $('.s-main__stats-block').remove();
}

$(window).on('load', function () {
    if ( $(window).width() <= 569 ) {
        createMobileVersionLoad()
    } else if ( $(window).width() <= 869 ) {
        createLaptopBlocksPlayer();
        divideOnTwo();
        createTabletBlocksSkills();
        createMobileVersionBack();
    } else if( $(window).width() <= 1169 ){
        divideOnThree();
        createLaptopBlocksPlayer();
        createTabletBlocksSkillsBack();
        createMobileVersionBack();
    } else {
        divideOnThreeBack();
        createTabletBlocksSkillsBack();
        createMobileVersionBack();
    }
});

$(window).on('resize', function () {
    if ( $(window).width() <= 569 ) {
        createMobileVersionResize();
    } else if ( $(window).width() <= 869 ) {
        divideOnThree();
        createLaptopBlocksPlayer();
        divideOnTwo();
        createTabletBlocksSkills();
        createMobileVersionBack();
    } else if( $(window).width() <= 1169 ){
        divideOnThree();
        createLaptopBlocksPlayer();
        createTabletBlocksSkillsBack();
        createMobileVersionBack();
    } else {
        divideOnThreeBack();
        createTabletBlocksSkillsBack();
        createMobileVersionBack();
    }
});

/*================================================*/
/*              Sports news             */
/*================================================*/

$('.news-slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1020,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 880,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});


//Clipping text in title

$(window).on('load',function () {
    clippingText( $('.news-item__category'), 45, '...');
    clippingText( $('.main-news .news-item__body .news-item__title'), 57, '...');
    clippingText( $('.news-item__banner .news-item__body .news-item__title'), 57, '...');
});

$(window).on('resize',function () {
    clippingText( $('.main-news .news-item__body .news-item__title'), 57, '...');
    clippingText( $('.news-item__banner .news-item__body .news-item__title'), 57, '...');
});

// Too many tags-item

function clippingTags( html , count ) {
    html.each(function () {

        var tags = $(this).find('.tags-item' );
        tagsArr = [].slice.call( tags );
        tagsArr.forEach(function (elem) {
            elem.classList.remove('hidden');
        });

        if ( tags.length > count ){
            for ( var i = tagsArr.length - 1; i >= count; i-- ){
                tagsArr[i].classList.add('hidden');
            }

            $(this).find('.news-tags').append('<span class="tags-item">...</span>')
        }
    })
}

$(window).on('load',function () {
    if ( $(window).width() < 620 ){
        clippingTags( $('.main-news'), 1 );
    } else if ( $(window).width() < 860 ){
        clippingTags( $('.main-news') , 14);
        clippingTags( $('.main-news.fun-news') , 14);
    } else {
        clippingTags( $('.main-news') , 30 );
    }
});

$(window).on('resize',function () {
    if ( $(window).width() < 620 ){
        clippingTags( $('.main-news') , 1 );
    } else if ( $(window).width() < 860 ){
        clippingTags( $('.main-news') , 14);
        clippingTags( $('.main-news.fun-news') , 14);
    } else {
        clippingTags( $('.main-news') , 30 );
    }
});


/*================================================*/
/*                    Article             */
/*================================================*/

$('.main-block__slider .slider-wrap').slick({
    dots: true,
    infinite: true,
});

// Thread
var userName;
$('.make-reply').on('click', function () {
    var userName = $(this).closest('.thread__user_title').find('.thread__user_name').text();
    if ( $(this).closest('.thread__user').hasClass('parent') ) {
        console.log(1);
        if ( $(this).closest('.thread__parent').find('.fromParent').html() ) {
            $(this).closest('.thread__parent').find('.fromParent').remove();
        } else {
            $(this).closest('.thread__user.parent').next('.thread__derived').append( threadReplyDunc(userName, 'fromParent'));
        }
    } else {
        if ( $(this).closest('.thread__parent').find('.fromThread').html() ) {
            $(this).closest('.thread__parent').find('.fromThread').remove();
        } else {
            $(this).closest('.thread__derived').append( threadReplyDunc(userName, 'fromThread') );
        }
    }

});

var threadReplyDunc = function (userName, from) {
    var threadReply = '<div class="thread__reply '+ from + '"><div class="thread__user"><div class="thread__user_icon"><img src="./img/icons/user-icon.jpg" alt="user icon"></div><div class="thread__user_content"><div class="thread__user_form_title"><span>Reply to </span><span class="reply-to">' + userName + '</span></div><div class="thread__user_input"><textarea maxlength="1000" name="reply" data-from="Nata Smirina" data-to="Jonathan Ive"></textarea><a class="thread__user_input_submit"><img src="./img/icons/send-icon.svg" alt="icon send"></a><div class="thread__user_input_count-letters"><span>0/1000</span></div></div></div></div></div>';
    return threadReply;
};

$(document).on('keyup' ,'.thread__user_input textarea', function () {
    var countPlace = $(this).parent().find('.thread__user_input_count-letters');
    var length = $(this).val().length;
    countPlace.find('span').remove();
    countPlace.append( '<span>' + length + '/1000</span>' );
});

//Icons heard

$('.thread__wrap').on('click','.meta-item.heard', function () {
    if ( $(this).hasClass('active') ){
        var placeOfChange = $(this).children('img').attr('src').lastIndexOf('-');
        var needSrc = $(this).children('img').attr('src').slice(0, placeOfChange) + '-grey.svg';
        $(this).children('img').attr('src', needSrc);
        $(this).removeClass('active');
        $(this).children('span').text( +$(this).children('span').text() - 1 );
    } else {
        var placeOfChange = $(this).children('img').attr('src').lastIndexOf('-');
        var needSrc = $(this).children('img').attr('src').slice(0, placeOfChange) + '-blue.svg';
        $(this).children('img').attr('src', needSrc);
        $(this).addClass('active');
        $(this).children('span').text( +$(this).children('span').text() + 1 );
    }
});

// Twitter widget

var ifremeSize = function () {
    var version = detectIE();

    var check = function ( time ) {
        setTimeout(function () {
            if ( document.querySelector('twitterwidget') ) {
                document.querySelector('twitterwidget').shadowRoot.querySelector('.EmbeddedTweet').classList.remove('EmbeddedTweet');
                setTimeout(function () {
                    document.querySelector('twitterwidget').style.height = 'auto';
                },100)
            }
            if ( document.querySelector('iframe.twitter-tweet') ) {
                document.querySelector('iframe.twitter-tweet').contentDocument.querySelector('.EmbeddedTweet').classList.remove('EmbeddedTweet');
                setTimeout(function () {
                    document.querySelector('iframe.twitter-tweet').style.height = 'auto';
                    document.querySelector('iframe.twitter-tweet').contentDocument.querySelector('.EmbeddedTweet-tweet').style.paddingBottom = 10;
                },100)
            }

        },time);
    };
    if ( version >= 11 ) {
        check( 3000 );
    } else {
        check( 100 );
    }
};

$(window).on('load',function () {
    ifremeSize();
});

//Audio player

$('.audio-banner').each(function () {
    audioPlayerControls( $(this) );
});

function audioPlayerControls(html) {
    var controls = {
        player: html.find('audio')[0],
        progress: html.find(".audio-banner__progress"),
        progress_field: html.find(".audio-banner__timeline"),
        toggle: html.find(".audio-banner__play-button"),
        toggle_volume: html.find(".audio-banner__volume"),
        time: html.find(".audio-banner__duration"),
        img: html.find(".audio-banner__album-image"),
        toggle_play: function () {
            (this.player.paused) ? this.player.play() : this.player.pause();
        },
        handle_progress_update: function () {
            var percent = (this.player.currentTime / this.player.duration) * 100;
            this.progress_field.css('width', percent + '%');
        },
        handle_time_update: function ( event_obj ) {
            var time = (event_obj.offsetX / this.progress.width()) * this.player.duration ;
            this.player.currentTime = time;
        },
        change_volume: function () {
            ( this.player.volume == 0 ) ? this.player.volume = 1 : this.player.volume = 0;
        },
        change_time: function () {
            var current_time = calculateCurrentValue( this.player.currentTime );
            this.time.text(current_time);
        }

    };

    //Play / Pause
    controls.toggle.on('click', function () {
        controls.toggle_play();
    });

    controls.player.addEventListener("ended", function() {
        controls.player.pause();
        controls.toggle.toggleClass("paused");
    });

    controls.player.addEventListener("play", function() {
        controls.toggle.toggleClass("paused");
        controls.img.addClass('play')
    });

    controls.player.addEventListener("pause", function() {
        controls.toggle.toggleClass("paused");
    });


    // Progress

    controls.player.addEventListener('timeupdate', function () {
        controls.handle_progress_update();
    });

    // Change progress
    controls.progress.on('click', function (e) {
        controls.handle_time_update(e);
    });

    // Volume
    controls.toggle_volume.on('click', function () {
        controls.change_volume();
    });

    controls.player.addEventListener('volumechange', function () {
        if ( !controls.player.volume ) {
            controls.toggle_volume.addClass('volumeNone')
        } else {
            controls.toggle_volume.removeClass('volumeNone')
        }
    });

    //Function for calculate time

    function calculateCurrentValue(currentTime) {
        var current_hour = parseInt(currentTime / 3600) % 24,
            current_minute = parseInt(currentTime / 60) % 60,
            current_seconds_long = currentTime % 60,
            current_seconds = current_seconds_long.toFixed(),
            current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

        return current_time;
    }

    controls.player.addEventListener('timeupdate', function () {
        controls.change_time()
    });
}

//Video player

var videoArr = [
    {src:'./video/soccet720.mp4', quality: '720'},
    {src:'./video/soccet360.mp4', quality: '360'}
];

$('.video-banner').each(function () {
    videoPlayerControls( $(this) )
});

function videoPlayerControls(html) {
    var controls = {
        player: html.find('video')[0],
        source: html.find('source')[0],
        content: html.find(".video-banner__content"),
        progress: html.find(".video-banner__progress"),
        progress_field: html.find(".video-banner__timeline"),
        buffered: html.find(".video-banner__buffered"),
        toggle: html.find(".video-banner__play-button"),
        toggle_center: html.find(".video-banner__play"),
        toggle_volume: html.find(".video-banner__volume"),
        toggle_fullscreen: html.find(".video-banner__fullscreen"),
        toggle_quality: html.find(".video-banner__quality li"),
        toggle_bkg: function () {
            (this.player.paused) ? this.content.removeClass('play') : this.content.addClass('play');
        },
        toggle_play: function () {
            (this.player.paused) ? this.player.play() : this.player.pause();
        },
        handle_progress_update: function () {
            var percent = (this.player.currentTime / this.player.duration) * 100;
            this.progress_field.css('width', percent + '%');
        },
        handle_time_update: function ( event_obj ) {
            var time = (event_obj.offsetX / this.progress.width()) * this.player.duration ;
            this.player.currentTime = time;
        },
        change_volume: function () {
            ( this.player.volume == 0 ) ? this.player.volume = 1 : this.player.volume = 0;
        }
    };


    //Play / Pause
    controls.toggle.on('click', function () {
        controls.toggle_play();
        controls.toggle_bkg();
    });

    controls.toggle_center.on('click', function () {
        controls.toggle_play();
        controls.toggle_bkg();
    });

    controls.player.addEventListener("ended", function() {
        controls.player.pause();
        controls.toggle.toggleClass("paused");
        controls.toggle_bkg();
        controls.toggle_center.toggleClass("paused");
    });

    controls.player.addEventListener("play", function() {
        controls.toggle.toggleClass("paused");
        controls.toggle_center.toggleClass("paused");
        controls.toggle_bkg();
    });

    controls.player.addEventListener("pause", function() {
        controls.toggle.toggleClass("paused");
        controls.toggle_center.toggleClass("paused");
        controls.toggle_bkg();
    });


    // Progress

    controls.player.addEventListener('timeupdate', function () {
        controls.handle_progress_update();
    });

    // Change progress
    controls.progress.on('click', function (e) {
        controls.handle_time_update(e);
    });

    // Buffering

    controls.player.addEventListener("progress", function() {
        var buffered = Math.floor(controls.player.buffered.end(0)) / Math.floor(controls.player.duration);
        controls.buffered.css( 'width' , Math.floor(buffered * controls.progress.width()) + "px");
    }, false);

    // Volume
    controls.toggle_volume.on('click', function () {
        controls.change_volume();
    });

    controls.player.addEventListener('volumechange', function () {
        if ( !controls.player.volume ) {
            controls.toggle_volume.addClass('volumeNone')
        } else {
            controls.toggle_volume.removeClass('volumeNone')
        }
    });

    // Fullscreen

    controls.toggle_fullscreen.on('click', function () {
        var elem = controls.player;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        $(this).addClass('active')
    });

    $(window).on('keydown', function (e) {
        if ( e.which == 27 ) {
            controls.toggle_fullscreen.removeClass('active');
        }
    });

    // Change quality
    controls.toggle_quality.on('click', function () {
        var number = $(this).attr('data-quality');
        var needText = $(this).text();
        var time = controls.player.currentTime;

        $(this).closest('.video-banner__quality').find('.nm-toggler').text( needText ).removeClass('open');
        $(this).closest('.video-banner__quality').find('.nm-dropdown').hide();

        controls.source.src = videoArr[number].src;
        controls.player.load();
        controls.player.currentTime = time;
        controls.player.play();
        controls.toggle.removeClass("paused");
        controls.toggle_center.removeClass("paused");
    })

}



/*====
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
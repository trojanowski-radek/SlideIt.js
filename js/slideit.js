/*
 * Created by Radoslaw Trojanowski on 27.06.14.
 * mail: trojanowski.radek@gmail.com
 * www: trojanowski.itl.pl
 * All rights reserved.
 */

/* Check prerequisities */

(function () {
    /* Check if jQuery is included */
    "use strict";
    if ($ === undefined) {
        alert('Slideit.js requires jQuery. Please include it!');
        console.error('Slideit.js requires jQuery. Please include it!');
    } else {
        var fontAwesomeIncluded = [];
        $.each(document.styleSheets, function (index, element) {
            fontAwesomeIncluded.push(element.href.indexOf('font-awesome') !== -1);
        });
        if ($.inArray(true, fontAwesomeIncluded) === -1) {
            alert('Slideit.js requires font-awesome.css. Please include it!');
            console.error('Slideit.js requires font-awesome.css. Please include it!');
        }
    }
})();

var $ = $ || {};

/* PARAMETERS
 *    direction - (to develop) direction of sliding (horizontal, vertical) - actually only horizontal
 *    delay     - how long in milliseconds should last sliding between slides (1000 by default)
 */
$.fn.slideit = function (direction, delay, disableMouseScrolling) {

    /* http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ */
    "use strict";

    delay = (typeof delay !== 'undefined') ? delay : 500;

    var main = $(this[0]),               /* Slide container */
        articles = main.find('article'); /* Particular slides */

    //Reset slide position to 0
    main.attr('slideit-actual-position', 1);

    //Add sliders
    main.prepend('<i id="toslide-up" class="fa fa-arrow-circle-up"></i>').
        append('<i id="toslide-down" class="fa fa-arrow-circle-down"></i>');

    //Numerate each article
    $.each(articles, function (index, element) {
        var $this = $(element);
        $this.attr('slideit-slide-number', index + 1);
    });

    //Arrows references
    var $up = $('#toslide-up'),
        $down = $('#toslide-down');

    //Hide UP on page load
    $up.hide();

    //Handle click on UP
    $up.click(function (e) {
        //Previous element and its position
        var previous = parseInt(main.attr('slideit-actual-position')) - 1;
        //Scroll only if there is previous slide
        if (previous >= 1) {
            var element = main.find('article[slideit-slide-number=' + previous + ']');
            //Perform animation regarding margin
            $('html, body').animate({
                scrollTop: (element.offset().top - element.css('margin-bottom').replace('px', ''))
            }, delay);
            //Change actual position attribute on slide container
            main.attr('slideit-actual-position', previous);
            //Show DOWN
            $down.show();
            //If no upper slide - hide UP
            if (previous === 1) {
                $up.hide();
            }
        }
    });

    //Handle click on DOWN
    $down.click(function (e) {
        //Next element and its position
        var next    = parseInt(main.attr('slideit-actual-position')) + 1;
        //Scroll only if there is next slide
        if (next <= articles.length) {
            var element = main.find('article[slideit-slide-number=' + next + ']');
            //Perform animation regarding margin
            $('html, body').animate({
                scrollTop: (element.offset().top - element.css('margin-top').replace('px', ''))
            }, delay);
            //Change actual position attribute on slide container
            main.attr('slideit-actual-position', next);
            //Show UP
            $up.show();
            //If no lower slide - hide DOWN
            if (next === articles.length) {
                $down.hide();
            }
        }
    });

};
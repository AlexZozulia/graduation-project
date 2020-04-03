// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

function lineBuilder(line){
    $.each($(line), function(){
        console.log($(this));
        let bar = new ProgressBar.Line("#"+$(this).attr('id'),{
            strokeWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            color: '#FF0000',
            trailColor: '#eee',
            trailWidth: 4,
            svgStyle: {width: '100%', height: '100%'},
            from: {color: '#FF0000'},
            to: {color: '#FF0000'}
        });
        bar.animate($(this).data('percent'));

        let like_container = $(this).data('id');
        $(like_container).css('left',Math.round($(this).data('percent') * 100) + "%");
        $(like_container).children('.percent').text(Math.round($(this).data('percent') * 100) + "%");
    });
}

function circleBuilder(circle){
    $.each($(circle), function(){
        console.log($(this));

        let bar = new ProgressBar.Circle("#"+$(this).attr('id'), {
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 6,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 6,
            from: {color: '#FF0000', a:0},
            to: {color: '#FF0000', a:1},
            // Set default step function for all animate calls
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
            }
        });
        bar.animate($(this).data('percent'));
    });
}

$(document). ready(function(){
    $(".sl-1").on("click", function(){
        $(".slides li").remuveClass("active");
        $(".slides-1").addClass("active");
        $(".sl-1").addClass("wight");
    });

    lineBuilder(".line");
    circleBuilder('.circles');
});

$('input').iCheck({
    checkboxClass: 'icheckbox_polaris',
    radioClass: 'iradio_polaris',
});
//Get the button:


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add('visible');
    } else {
        mybutton.classList.remove('visible');
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $("html, body").animate({ scrollTop: 0 }, 600);
}
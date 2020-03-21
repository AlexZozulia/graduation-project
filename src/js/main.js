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
            to: {color: '#FF0000'},
            text: {
                style: {
                    // Text color.
                    // Default: same as stroke color (options.color)
                    color: '#999',
                    position: 'absolute',
                    left: '0',
                    top: '30px',
                    padding: 0,
                    margin: 0,
                    transform: null
                },
                autoStyleContainer: false
            },
            step: (state, bar) => {
                bar.setText(Math.round(bar.value() * 100) + ' %');
            }
        });
        bar.animate($(this).data('percent'));
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
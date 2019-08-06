var el = document.querySelector('body')
var pel = document.querySelector('.position')

var colorStops = ['red', '#ffdd1f', 'green'];

var ct = new window.webit.colorTransition.default(colorStops);

function setColor(percents) {
    pel.textContent = percents+'%';
    el.style.background = ct.getColor(percents).rgba
}

function handleMove(ev) {
    setColor(Math.round((ev.pageX / el.getBoundingClientRect().width) * 100))
}

function outputColorStops(colorStops) {
    var el = document.querySelector('.colors');
    for (var i = 0; i < colorStops.length; i++) {
        var span = document.createElement('span')
        span.style.background = colorStops[i];
        console.log(span);
        el.appendChild(span);
    }
}

el.addEventListener('mousemove', handleMove);
el.addEventListener('touchmove', handleMove);

setColor(0);
outputColorStops(colorStops);
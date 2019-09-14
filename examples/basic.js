var el = document.querySelector('body')
var pel = document.querySelector('.position')

var colorStops = ['red', '#ffdd1f', 'green'];
var ct = new window.webit.colorTransition.default(colorStops);

function setColor(progress) {
    pel.textContent = "progress: "+progress;
    el.style.background = ct.getColor(progress).rgba
}

function handleMove(ev) {
    setColor(ev.pageX / el.getBoundingClientRect().width)
}

function outputColorStops(colorStops) {
    var el = document.querySelector('.colors');
    for (var i = 0; i < colorStops.length; i++) {
        var span = document.createElement('span')
        span.style.background = colorStops[i];
        el.appendChild(span);
    }
}

el.addEventListener('mousemove', handleMove);
el.addEventListener('touchmove', handleMove);

setColor(0);
outputColorStops(colorStops);

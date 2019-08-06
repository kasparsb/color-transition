function setColor(percents) {
    pel.textContent = percents+'%';
    el.style.background = ct.getColor(percents).rgba
}

var el = document.querySelector('body')
var pel = document.querySelector('.position')

var ct = new window.webit.colorTransition.default(
    ['red', '#ffdd1f', 'green']
);

setColor(0);

el.addEventListener('mousemove', function(ev){
    setColor(Math.round((ev.pageX / el.getBoundingClientRect().width) * 100))
});
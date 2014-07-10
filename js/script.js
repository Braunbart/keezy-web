var touchstartOrMousedown = (('ontouchstart' in window)) ? 'touchstart' : 'mousedown';
var touchendOrMouseup = (('ontouchend' in window)) ? 'touchend' : 'mouseup';
var sounds = [];
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var circleTimeoutID;
var bufferLoader = new BufferLoader(
    context,
    [
      'media/1.wav',
      'media/2.wav',
      'media/3.wav',
      'media/4.wav',
      'media/5.wav',
      'media/6.wav',
      'media/7.wav',
      'media/8.wav',
    ],
    finishedLoading
  );

bufferLoader.load();

function finishedLoading(bufferList) {
    sounds = bufferList;
}

function playSound(number) {
    var source = context.createBufferSource();
    source.buffer = sounds[number];
    source.connect(context.destination);
    source.start(0);
}

function hideCircle() {
    if(circleTimeoutID !== undefined) {
        window.clearTimeout(circleTimeoutID);
    }
    circleTimeoutID = window.setTimeout(showCircle, 1500);
    $('.circle-wrap').addClass('hidden');
}

function showCircle() {
    window.clearTimeout(circleTimeoutID);
    $('.circle-wrap').removeClass('hidden');
}

$('.pad').on(touchstartOrMousedown, function() {
    $(this).addClass('pressed');
    if($('.board').hasClass('delete')) {
       $(this).addClass('empty'); 
    } else {
        hideCircle();
        playSound($(this).index());
    }
});

$('html').on(touchendOrMouseup, function() {
    $('.pressed').removeClass('pressed');
});

$('.circle-wrap').on(touchstartOrMousedown, function() {
    $(this).toggleClass('active');
});

$('.menu .circle').on(touchstartOrMousedown, function() {
    $(this).addClass('pressed active');
});

$('.menu .settings, .menu .boards').on(touchstartOrMousedown, function() {
    $('.overlay.' + $(this).attr('data-overlay')).addClass('active');
});

$('.menu .delete').on(touchstartOrMousedown, function() {
    $('.board').addClass('delete');
});

$('.menu .add').on(touchstartOrMousedown, function() {
    $('.pad').addClass('empty');
});

$('.close').on(touchstartOrMousedown, function() {
    $('.overlay').removeClass('active');
});

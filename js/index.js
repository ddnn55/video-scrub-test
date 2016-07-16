var frameNumber = 0, // start video at frame 0
    // lower numbers = faster playback
    playbackConst = 500,
    // select video element         
    vid = document.getElementById('v0'); 
    // var vid = $('#v0')[0]; // jquery option

var SPEED = 0.005;

var progress = 0,
    normalX = 0.5;

document.addEventListener('mousemove', function(event) {
  normalX = event.pageX / vid.getBoundingClientRect().width;
});

var hotspots = document.querySelectorAll('.hotspots .hotspot');

function updateHotspots() {
  for(var h = 0; h < hotspots.length; h++) {
    var hotspot = hotspots[h];
    //console.log(hotspot);
    var hX = +hotspot.getAttribute('data-x'),
        hY = +hotspot.getAttribute('data-y'),
        hDepth = +hotspot.getAttribute('data-depth');
    //console.log(hX, hY);
    var x = (hX + progress) * vid.getBoundingClientRect().width / hDepth,
        y = hY * vid.getBoundingClientRect().height;
    hotspot.style.left = x + 'px';
    hotspot.style.top = (vid.getBoundingClientRect().height - y) + 'px';
  }
}

// Use requestAnimationFrame for smooth playback
function scollPlay(){  
  
  if(normalX > .6) {
    progress -= (normalX - 0.6) * SPEED;
  }
  else if(normalX < 0.4) {
    progress += (0.4 - normalX) * SPEED;
  }

  if(progress < 0.0) {
    progress = 1.0 + progress;
  }
  else if(progress > 1.0) {
    progress = progress - 1.0;
  }

  //var frameNumber  = window.pageYOffset/playbackConst;
  var frameNumber  = progress * Math.floor(vid.duration);
  if(isFinite(frameNumber)) {
    vid.currentTime  = frameNumber;
  }
  updateHotspots();
  window.requestAnimationFrame(scollPlay);
}

window.requestAnimationFrame(scollPlay);
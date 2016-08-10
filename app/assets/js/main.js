$(document).ready(function(){

  // -------------- Main Menu Jquery

  $(".navbar-nav li").each( function() {

    $(this).has("ul").append("<i class='fa fa-caret-down menu-caret'></i>").addClass("has-sub");

  });

  $(window).on("resize", function () {

    if ( $(window).width() >= 768 ){

      $(".navbar-nav li:has(ul) .dropdown-menu").each( function() {

        var subWidth = $(this).outerWidth();

        $(this).css({ "margin-left" : - subWidth / 2 + "px", "left" : "50%", "display" : "none", "width" : subWidth });

      });

      $(".navbar-nav li:has(ul)").removeClass("open collapsible");

    }

    else {

      $(".dropdown-menu").removeAttr( 'style' );

    }

  }).resize();



  $(window).on("resize", function () {

    if ( $(window).width() <= 1200 ){


      $( ".navbar-nav .fa-caret-down" ).on( "click", function() {

        $(this).parent().find(".dropdown-menu").stop().slideToggle( "fast", function() {

          $(this).parent().toggleClass("open collapsible");

        });

      });

    }

    else {

      $(".dropdown-menu").removeAttr( 'style' );

    }

  }).resize();


  // -------------- Placeholder Jquery

  $('input, textarea').placeholder();

  // -------------- Reject IE Jquery

  $.reject({

    reject : {
      all: false,
      msie: 8
    },
    display: ['firefox','chrome','safari'],
    imagePath: 'assets/images/'

  });

  // -------------- New Jquery

});


'use strict';

var width = undefined,
    height = undefined;
var pixels = [];
var coloredPixels = [];
var colors = ['#540045', '#C60052', '#FF714B', '#EAFF87', '#ACFFE9'];
var currentPixel = 0;
var mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var drawGrid = function drawGrid() {
  ctx.clearRect(0, 0, width, height);

  for (var i = 0, l = pixels.length; i < l; i++) {
    pixels[i][4] = 0;
  }

  for (var i = 0, l = coloredPixels.length; i < l; i++) {
    var pix = Math.floor(coloredPixels[i].y / 10) * (Math.floor(width / 10) + 1) + Math.floor(coloredPixels[i].x / 10);
    if (pixels[pix]) {
      pixels[pix][4] = coloredPixels[i].color;
      pixels[pix][5] = coloredPixels[i].alpha;
    }

    if (coloredPixels[i].alpha > 0) coloredPixels[i].alpha -= 0.008;
    if (coloredPixels[i].alpha < 0) coloredPixels[i].alpha = 0;
    coloredPixels[i].x += coloredPixels[i].vx;
    coloredPixels[i].y += coloredPixels[i].vy;
  }

  for (var i = 0, l = pixels.length; i < l; i++) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#222';
    ctx.fillRect(pixels[i][0], pixels[i][1], pixels[i][2], pixels[i][3]);
    ctx.globalAlpha = pixels[i][5];
    ctx.fillStyle = pixels[i][4];
    ctx.fillRect(pixels[i][0], pixels[i][1], pixels[i][2], pixels[i][3]);
  }
};

var resize = function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  pixels = [];
  for (var y = 0; y < height / 10; y++) {
    for (var x = 0; x < width / 10; x++) {
      pixels.push([x * 10, y * 10, 8, 8, '#222', 1]);
    }
  }
};

var draw = function draw() {
  launchPixel();
  launchPixel();
  drawGrid();
  requestAnimationFrame(draw);
};

var initColoredPixels = function initColoredPixels() {
  for (var i = 0; i < 300; i++) {
    coloredPixels.push({
      x: width / 2,
      y: height / 2,
      alpha: 0,
      color: colors[i % 5],
      vx: -1 + Math.random() * 2,
      vy: -1 + Math.random() * 2
    });
  }
};

var launchPixel = function launchPixel() {
  coloredPixels[currentPixel].x = mousePosition.x;
  coloredPixels[currentPixel].y = mousePosition.y;
  coloredPixels[currentPixel].alpha = 1;

  currentPixel++;
  if (currentPixel > 299) currentPixel = 0;
};

resize();
initColoredPixels();
draw();

window.addEventListener('resize', resize);
window.addEventListener('mousemove', function (e) {
  mousePosition.x = e.pageX;
  mousePosition.y = e.pageY;
});

var touchMove = function touchMove(e) {
  e.preventDefault();
  mousePosition.x = e.touches[0].pageX;
  mousePosition.y = e.touches[0].pageY;
};

document.addEventListener('touchstart', touchMove);
document.addEventListener('touchmove', touchMove);

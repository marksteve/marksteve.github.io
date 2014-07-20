var face = document.querySelector('h1 a');
var section = document.querySelector('section');

window.onmousemove = function(e) {
  var mx = section.offsetWidth;
  var my = section.offsetHeight;
  var dx = e.screenX - face.offsetLeft - 32;
  var sx = dx / Math.abs(dx);
  var dy = e.screenY - face.offsetTop - 128;
  var sy = dy / Math.abs(dy);
  face.style.transform = 'rotateY(' +
    (30 * (
      Math.abs(dx) > mx ? sx * mx : dx
    ) / mx) + 'deg) rotateX(' +
    (-30 * (
      Math.abs(dy) > my ? sy * my : dy
    ) / my) + 'deg)';
}

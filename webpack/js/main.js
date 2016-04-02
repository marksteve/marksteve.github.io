import 'blissfuljs'
import tinycolor from 'tinycolor2'

let accentColor, backgrounds = $('.backgrounds')

$$('[data-background]').forEach(function(el) {
  let background = $('.' + el.dataset.background, backgrounds)
  el._.events({
    'mouseenter': function() {
      el._.transition({color: accentColor})
      background._.transition({opacity: 0.5})
    },
    'mouseleave': function() {
      el._.transition({color: 'white'})
      background._.transition({opacity: 0})
    },
  })
})

function setColor(e) {
  let r = e.clientX / window.innerWidth
  let g = e.clientY / window.innerHeight
  let b = r / (r + g)
  accentColor = tinycolor.fromRatio({r, g, b})
  backgrounds._.style({backgroundColor: accentColor})
}

document.addEventListener('mousemove', setColor)

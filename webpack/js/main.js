import 'blissfuljs'
import tinycolor from 'tinycolor2'
import GyroNorm from 'gyronorm/dist/gyronorm.complete'

let accentColor, backgrounds = $('.backgrounds')

$$('a').forEach(function(el) {
  el._.events({
    'mouseenter': function() {
      el._.style({color: accentColor})
    },
    'mouseleave': function() {
      el._.style({color: 'white'})
    },
  })
})

$$('[data-background]').forEach(function(el) {
  let background = $('.' + el.dataset.background, backgrounds)
  el._.events({
    'mouseenter': function() {
      background._.transition({opacity: 0.5})
    },
    'mouseleave': function() {
      background._.transition({opacity: 0})
    },
  })
})

function setColor(r, g, b) {
  accentColor = tinycolor.fromRatio({r, g, b})
  backgrounds._.style({backgroundColor: accentColor})
}

document.addEventListener('mousemove', function(e) {
  let r = e.clientX / window.innerWidth
  let g = e.clientY / window.innerHeight
  let b = r / (r + g)
  setColor(r, g, b)
})

if (typeof window.orientation !== 'undefined') {
  let gn = new GyroNorm()
  gn.init().then(function() {
    gn.start(function(data) {
      let r = data.do.alpha / 360
      let g = (data.do.gamma + 180) / 360
      let b = (data.do.beta + 90) / 180
      setColor(r, g, b)
    })
  })
}

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

function randomColor() {
  accentColor = tinycolor.random().toHexString()
  backgrounds._.style({backgroundColor: accentColor})
}
setInterval(randomColor, 500)

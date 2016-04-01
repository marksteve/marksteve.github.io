import 'blissfuljs'

let backgrounds = $('.backgrounds')

$$('[data-background]').forEach(function(el) {
  let background = $('.' + el.dataset.background, backgrounds)
  el._.events({
    'mouseover': function() {
      background._.style({display: 'block', opacity: 0})
      setTimeout(function() {
        background._.transition({opacity: 0.5})
      })
    },
    'mouseout': function() {
      background
        ._.transition({opacity: 0})
        .then(function() {
          background._.style({display: 'none'})
        })
    },
  })
})

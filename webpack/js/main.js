import 'blissfuljs'

let backgrounds = $('.backgrounds')

$$('[data-background]').forEach(function(el) {
  let background = $('.' + el.dataset.background, backgrounds)
  el._.events({
    'mouseenter': function() {
      background._.transition({opacity: 1})
    },
    'mouseleave': function() {
      background._.transition({opacity: 0})
    },
  })
})

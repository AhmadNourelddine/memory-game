$(document).ready(function() {

  $(document).keydown(function() {
    startGame()
  })

  var level = 0
  var clicks = 0
  const colors = ['green', 'red', 'yellow', 'blue']
  let saved_colors = []


  function startGame() {
    console.log('game started')
    $(document).off('keydown')

    level = 0
    saved_colors = []
    $('#title').text('Press Any Key to Start')
    generateLevel()

  }

  function generateLevel() {
    level += 1
    clicks = 0

    console.log('generating level ' + level)

    $('#title').text('level ' + level)

    var x = Math.floor(Math.random() * 4)
    var color = colors[x]
    console.log('random color is ' + colors[x])
    saved_colors.push(color)

    src = 'sounds/' + color + '.mp3'
    var audio = new Audio(src)
    audio.play()

    console.log(saved_colors)

    $(`#${color}`).fadeOut('slow')
    setTimeout(() => {
      $(`#${color}`).fadeIn('slow')
    }, 500)

    check_clicks()
  }

  function check_clicks() {

    $('.btn').click(function(event) {

      console.log('button clicked ' + event.target.id)

      src = 'sounds/' + event.target.id + '.mp3'
      var audio = new Audio(src)
      audio.play()

      $(event.target).addClass('pressed')
      setTimeout(() => {
        $(event.target).removeClass('pressed')
      }, 500)

      if ($(event.target).hasClass(saved_colors[clicks]) != true) {
        console.log('lost game')
        $('.btn').off('click')
        lose_game()
        return
      }
      clicks++
      console.log('increment clicks: ' + clicks)
      if (clicks == level) {
        setTimeout(() => {
          $('.btn').off('click')
          generateLevel()
        }, 1500)
      }
    })
  }

  function lose_game() {

    $('#title').text('Game Over, Press Any Key to Restart')

    src = 'sounds/wrong.mp3'
    var audio = new Audio(src)
    audio.play()

    document.body.classList.add('game-over')
    setTimeout(() => {
      document.body.classList.remove('game-over')
    }, 1000)

    $(document).keydown(function() {
      startGame()
    })
  }

})

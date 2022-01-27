
$(document).ready( function(){

  $(document).keydown( function(){

    var level = 0
    const colors = ['green', 'red', 'yellow', 'blue']
    let saved_colors = []

    startGame()

    function startGame() {
      console.log('game started')
      level = 0
      $('#title').text('Press Any Key to Start')
      generateLevel()
    }

    function generateLevel() {
      level += 1
      console.log('generate level '+level)
      $('#title').text('level '+level)
      var x = Math.floor(Math.random() * 4)
      var color = colors[x]
      console.log('color is '+colors[x])
      saved_colors.push(color)

      src = 'sounds/' + color + '.mp3'
      var audio = new Audio(src)
      audio.play()

      console.log(`.btn, .${color}`)
      $(`#${color}`).fadeOut('slow')
      setTimeout( ()=>{
        $(`#${color}`).fadeIn('slow')
      },500)
      check_clicks()
    }

    function check_clicks() {

      var clicks = 0

      $('.btn').click(function(event) {
        console.log(event.target.id)
        src = 'sounds/' + event.target.id + '.mp3'
        var audio = new Audio(src)
        audio.play()

        $(event.target).addClass('pressed')
        setTimeout(()=>{
        $(event.target).removeClass('pressed')
        },500)
        console.log($(event.target).hasClass(saved_colors[clicks]))
        if ($(event.target).hasClass(saved_colors[clicks]) != true) {
          lose_game()
          return
        }
        clicks ++
        if (clicks == level) {
            generateLevel()
          return
        }
        return

      })
      return
    }

    function lose_game() {
      $('title').text('Game Over, Press Any Key to Restart')
      src = 'sounds/wrong.mp3'
      var audio = new Audio(src)
      audio.play()
      document.body.classList.add('game-over')
      setTimeout(()=>{
        document.body.classList.remove('game-over')
      },1000)
    }
  })
})

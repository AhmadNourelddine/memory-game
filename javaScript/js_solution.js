window.onload = function() {

  document.addEventListener('keydown', start)

  function start() {

    const title = document.getElementById('title')
    let saved_colors = []
    const buttons = document.getElementsByClassName('btn')

//arranged the colors in the same order of array "buttons" created above
// green button 0 / red button 1 / yellow button 2 / blue button 3
    const colors = ['green', 'red', 'yellow', 'blue']

    var level = 0
    var clicks = 0

    startGame()

    function startGame() {
      console.log('game started')
      level = 0
      clicks = 0
      saved_colors = []
      title.innerText = 'Press Any Key to Start'
      generateLevel()
    }

    function generateLevel() {

      level += 1
      clicks = 0

      console.log('generating level ' + level)

      var x = Math.floor(Math.random() * 4)
      let btn_lvl = buttons[x]

      fadeEffect(btn_lvl)
      playAudio(colors[x])
      saved_colors.push(colors[x])

      console.log('button color generated ' + btn_lvl.className)
      console.log(saved_colors)

      title.innerText = 'Level ' + level

      add_BtnListner()

    }

    function checkClick(e) {

      e.target.classList.add('pressed')
      setTimeout(function() {
        e.target.classList.remove('pressed')
      }, 500)
      console.log(e.target.className)

      var btnColor = e.target.className.split(' ')[1]

      if (e.target.className != 'btn ' + saved_colors[clicks] + ' pressed') {
        lose_game()
        return
      }
      playAudio(btnColor)
      clicks++
      console.log('clicks ' + clicks)

      if (clicks == level) {
        remove_BtnListner()
        setTimeout(function() {
          generateLevel()
        }, 1500)
        return
      }
    }

    function lose_game() {
      title.innerText = 'Game Over, Press Any Key to Restart'
      remove_BtnListner()
      document.body.classList.add('game-over')
      playAudio('wrong')
      setTimeout(function() {
        document.body.classList.remove('game-over')
      }, 1000)
    }

    function add_BtnListner() {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', checkClick)
      }
    }

    function remove_BtnListner() {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', checkClick)
      }
    }

    function fadeEffect(btn) {
      btn.style.opacity = '0.2'
      setTimeout(function() {
        btn.style.opacity = '1'
      }, 500)
    }

    function playAudio(color) {
      src = 'sounds/' + color + '.mp3'
      var audio = new Audio(src)
      audio.play()
    }

  }
}

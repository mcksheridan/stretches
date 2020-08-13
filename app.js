window.onload = function app() {
    // DOM
    const currentStretch = document.querySelector('.stretch-current_name')
    const nextStretch = document.querySelector('.stretch-next')
    const countdown = document.querySelector('.timer_countdown')
    const countdownArea = document.querySelector('.timer')
    const countdownText = document.querySelector('.timer_text')
    const currentStretchInfo = document.querySelector('.stretch-current_info')
    const stretchImage = document.querySelector('.stretch-image')
    const materialIcon = document.querySelector('.material-icons')
    const stretchImageImg = document.querySelector('.stretch-image_image')

    function stretches(stretchNum) {
        stretchImageImg.alt = exercises[stretchNum].exercise
        stretchImageImg.src = exercises[stretchNum].image
        currentStretch.innerText = exercises[stretchNum].exercise
        nextStretch.innerText = `Next: ${exercises[(stretchNum += 1)].exercise}`
    }

    // For the position in the exercises object, e.g. exercises[j]
    let j = 0
    // For the time limit on the countdown, e.g. i secs left, refer to timer30.js or timer60.js

    let interval

    function timer() {
        interval = setInterval(timerCount, 1000)
    }

    function timerCount() {
        if (i > 0) {
            i -= 1
            countdown.innerText = i
        } else if (i === 0 && j < exercises.length - 1) {
            i = k
            j += 1
            stretches(j)
            clearInterval(interval)
            timer()
        } else {
            currentStretch.innerText = 'Well done!'
            nextStretch.innerText = ''
        }
    }

    // Set display to none for the stretch image div--otherwise, the user will need to click twice
    stretchImage.style.display = 'none'

    currentStretchInfo.addEventListener('click', () => {
        if (stretchImage.style.display === 'none') {
            stretchImage.style.display = 'block'
            materialIcon.innerText = 'cancel'
        } else {
            stretchImage.style.display = 'none'
            materialIcon.innerText = 'help'
        }
    })

    countdownArea.addEventListener('click', () => {
        timer()
        countdownText.innerText = ''
    })
}

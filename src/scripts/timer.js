const IMAGE_TEXT = '(View Image)';

const template = `
      <header class="timer-header">
        <h2><span class="timer-header__seconds"></span> Second Timer</h2>
        <p><span class="timer-header__current-exercise current-exercise">Current Exercise:</span>
        <span class="current-exercise__name"></span>
        <button class="current-exercise__image"></button></p>
        <div class="current-exercise__image-modal image-modal">
        <img src="" class="image-modal__image" alt="">
        </div>
        <p><span class="timer-header__upcoming-exercise upcoming-exercise">Upcoming Exercise:</span>
        <span class="upcoming-exercise__name"></span></p>
      </header>

      <main>
        <svg class="timer-bar" width="90vw" height="2.5rem">
          <rect class="timer-bar__background" width="100%" height="40" />
          <rect class="timer-bar__progress" width="100%" height="40" />
          <text class="timer-bar__remaining-time" x="1%" y="60%">0</text>
        </svg>
      </main>

      <footer class="timer-button">
          <button type="button" class="timer-button__control">Loading...</button>
      </footer>
`;

const createExerciseList = () => {
  const exerciseList = [];
  const exerciseHtml = document.querySelector('.routine');
  const exerciseData = exerciseHtml.querySelectorAll('.routine__exercise-name');
  exerciseData.forEach((exercise) => {
    const exerciseString = exercise.textContent;
    const exerciseStringWithoutImage = exerciseString.split(IMAGE_TEXT);
    const exerciseName = exerciseStringWithoutImage[0].trim();
    /* const exerciseHTML = exercise.innerHTML */
    const exerciseObject = {
      name: exerciseName,
      img: '',
    };
    const exerciseImgHTML = exercise.querySelector('.exercise-img');
    if (exerciseImgHTML) {
      const imgSrc = exerciseImgHTML.getAttribute('href');
      exerciseObject.img = imgSrc;
    }
    exerciseList.push(exerciseObject);
  });
  return exerciseList;
};

const exercises = createExerciseList();

class Timer extends HTMLElement {
  constructor() {
    super(); // Call the constructor of HTMLElement
    this.innerHTML = template;
    this.state = 'Uninitialized';
    this.startingTime = this.getAttribute('time');
    this.timerSpeed = 1000;
    this.remainingTime = this.startingTime;
    this.message = 'Touch to Begin';
    this.startingProgressPercent = 100;
    this.progressPercent = this.startingProgressPercent;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
    this.interval = undefined;
    this.exercise = exercises;
    this.currentExercise = 0;
    this.routineLength = this.exercise.length - 1;
  }

  connectedCallback() {
    const timerRemainingTime = this.querySelector('.timer-bar__remaining-time');
    const timerButton = this.querySelector('.timer-button__control');
    const timerHeaderSeconds = this.querySelector('.timer-header__seconds');
    const timerHeaderCurrentExercise = this.querySelector('.current-exercise__name');
    const timerHeaderUpcomingExercise = this.querySelector('.upcoming-exercise__name');
    timerRemainingTime.innerHTML = this.startingTime;
    timerButton.innerHTML = 'Touch to Begin';
    timerHeaderSeconds.innerText = this.startingTime;
    timerHeaderCurrentExercise.textContent = this.exercise[0].name;
    timerHeaderUpcomingExercise.textContent = this.exercise[1].name;
    timerButton.addEventListener('click', () => {
      if (this.state === 'Uninitialized') {
        this.beginTimer();
        return;
      }
      if (this.state === 'Active') {
        this.pauseTimer();
        return;
      }
      if (this.state === 'Paused') {
        this.resumeTimer();
      }
      if (this.state === 'Finished') {
        this.resetTimer();
        clearInterval(this.interval);
        this.beginTimer();
      }
    });
  }

  setTimer(time) {
    this.remainingTime = time;
  }

  // When changing the starting time, you must also change all properties
  // that are dependent on the starting time.
  recalculateValues() {
    this.remainingTime = this.startingTime;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
  }

  updateStartingTime(time) {
    this.startingTime = time;
    this.recalculateValues();
  }

  updateState(state) {
    this.state = state;
  }

  updateMessage(message) {
    this.message = message;
  }

  beginNextExercise() {
    if (this.remainingTime === 0) {
      this.allowRestart();
      this.updateCurrentExercise();
    }
  }

  allowRestart() {
    if (this.currentExercise === this.routineLength) {
      this.state = 'Finished';
      this.message = 'Restart';
    }
  }

  updateCurrentExercise() {
    if (this.currentExercise < this.routineLength) {
      this.currentExercise += 1;
      this.resetTime();
      clearInterval(this.interval);
      this.beginTimer();
    }
  }

  decrementTimeRemaining() {
    if (this.state === 'Paused') {
      return;
    }
    if (this.remainingTime > 0) {
      this.setTimer(this.remainingTime - 1);
    }
  }

  updateProgressPercent(percent) {
    this.progressPercent = percent;
  }

  decrementProgressPercent() {
    this.updateProgressPercent(this.progressPercent - this.decreasePerInterval);
  }

  decrementProgressBar() {
    if (this.state === 'Paused') {
      return;
    }
    if (this.progressPercent > this.decreasePerInterval) {
      this.decrementProgressPercent();
      return;
    }
    if (this.progressPercent >= 0) {
      this.updateProgressPercent(0);
    }
  }

  decrementTimer() {
    this.beginNextExercise();
    this.decrementTimeRemaining();
    this.decrementProgressBar();
    this.updateTimerUI();
  }

  updateTimerUI() {
    const timerRemainingTime = this.querySelector('.timer-bar__remaining-time');
    const timerButton = this.querySelector('.timer-button__control');
    const timerProgressBar = this.querySelector('.timer-bar__progress');
    const currentExercise = this.querySelector('.current-exercise__name');
    const upcomingExercise = this.querySelector('.upcoming-exercise__name');
    timerRemainingTime.innerHTML = this.remainingTime;
    timerButton.innerHTML = this.message;
    timerProgressBar.setAttribute('width', `${this.progressPercent}%`);
    // Update timer class
    if (this.state === 'Active') {
      timerButton.classList.add('timer__message--active');
      timerButton.classList.remove('timer__message--paused');
    }
    if (this.state === 'Paused') {
      timerButton.classList.remove('timer__message--active');
      timerButton.classList.add('timer__message--paused');
    }
    // Update current/upcoming exercise
    if (this.currentExercise <= this.routineLength) {
      currentExercise.textContent = this.exercise[this.currentExercise].name;
    }
    if (this.currentExercise < this.routineLength) {
      upcomingExercise.textContent = this.exercise[this.currentExercise + 1].name;
    }
    if (this.currentExercise === this.routineLength) {
      upcomingExercise.textContent = 'Good job!';
    }
  }

  initializeTimer() {
    this.interval = setInterval(this.decrementTimer.bind(this), this.timerSpeed);
  }

  beginTimer() {
    this.updateState('Active');
    this.updateMessage('Pause');
    this.initializeTimer();
    this.updateTimerUI();
  }

  pauseTimer() {
    this.updateState('Paused');
    this.updateMessage('Resume');
    this.updateTimerUI();
  }

  resumeTimer() {
    this.updateState('Active');
    this.updateMessage('Pause');
    this.updateTimerUI();
  }

  resetTime() {
    this.remainingTime = this.startingTime;
    this.progressPercent = this.startingProgressPercent;
  }

  resetTimer() {
    this.resetTime();
    this.currentExercise = 0;
  }
}

export default Timer;

window.customElements.define('timer-object', Timer);

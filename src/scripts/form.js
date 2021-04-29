const NUMBER_OF_EXERCISES_TO_DISPLAY = 5;

const addMoreSection = document.querySelector('.add-more');

// Create button on the page

addMoreSection.innerHTML = `
<button type="button" class="add-more__button"><span class="material-icons">add</span> Add more exercises</button>
`;

const addMoreButton = document.querySelector('.add-more__button');

const initialExercises = document.querySelectorAll('.exercise-section');

// Only show 5 exercises and hide the remaining 20 from default 25
const hideOverflowExercises = () => {
  initialExercises.forEach((exercise, index) => {
    if (index > (NUMBER_OF_EXERCISES_TO_DISPLAY - 1)) {
      const overflowExercise = exercise;
      overflowExercise.style.display = 'none';
    }
  });
};

hideOverflowExercises();

const getNumberOfVisibleExercises = () => {
  const visibleExercises = [];
  const exercises = document.querySelectorAll('.exercise-section');
  exercises.forEach((exercise) => {
    if (exercise.style.display !== 'none') {
      visibleExercises.push(exercise);
    }
  });
  const visibleExercisesNumber = visibleExercises.length;
  return visibleExercisesNumber;
};

const addNewExerciseSection = (exerciseNumber) => {
  const availableExercises = document.querySelectorAll('.exercise-section');
  const lastExerciseAvailableIndex = (availableExercises.length - 1);
  const lastExerciseAvailable = availableExercises[lastExerciseAvailableIndex];
  const newExerciseSection = document.createElement('section');
  newExerciseSection.classList.add('form__section');
  newExerciseSection.classList.add('section');
  newExerciseSection.classList.add('exercise-section');
  newExerciseSection.innerHTML = `
  <h2 class="section__title">Exercise ${exerciseNumber}</h2>
  <label class="section__label">Exercise ${exerciseNumber} name (optional)</label>
  <input type="text" maxlength="40" class="section__input section__exercise-name">
  <label class="section__label">Exercise ${exerciseNumber} image (optional)</label>
  <input type="url" placeholder="http://" maxlength="256" class="section__input section__exercise-img">
  `;
  lastExerciseAvailable.parentNode
    .insertBefore(newExerciseSection, lastExerciseAvailable.nextSibling);
};

const showMoreExercises = () => {
  const numberOfVisibleExercises = getNumberOfVisibleExercises();
  const initialExercisesNumber = initialExercises.length;
  if (numberOfVisibleExercises
    > (initialExercisesNumber - NUMBER_OF_EXERCISES_TO_DISPLAY)) {
    for (let n = numberOfVisibleExercises + 1;
      n <= numberOfVisibleExercises + NUMBER_OF_EXERCISES_TO_DISPLAY; n += 1) {
      addNewExerciseSection(n);
    }
  }
  if (numberOfVisibleExercises
    <= (initialExercisesNumber - NUMBER_OF_EXERCISES_TO_DISPLAY)) {
    initialExercises.forEach((exercise, index) => {
      if (numberOfVisibleExercises <= index
              && index < (numberOfVisibleExercises + NUMBER_OF_EXERCISES_TO_DISPLAY)) {
        const exerciseToDisplay = exercise;
        exerciseToDisplay.style.display = 'block';
      }
    });
  }
};

addMoreButton.addEventListener('click', () => {
  showMoreExercises();
});

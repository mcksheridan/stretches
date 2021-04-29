const getOccupiedExerciseNameIndexes = (exerciseNamesArray) => {
  const occupiedIndexes = [];
  exerciseNamesArray.forEach((exercise, index) => {
    const trimmedExerciseName = exercise.trim();
    if (trimmedExerciseName !== '') {
      occupiedIndexes.push(index);
    }
  });
  return occupiedIndexes;
};

const createExerciseArray = (exerciseNamesArray, exerciseImagesArray) => {
  const occupiedIndexes = getOccupiedExerciseNameIndexes(exerciseNamesArray);
  const exerciseArray = [];
  occupiedIndexes.forEach((index) => {
    const exerciseObject = {};
    exerciseObject.name = exerciseNamesArray[index];
    const trimmedExerciseImage = exerciseImagesArray[index].trim();
    if (trimmedExerciseImage !== '') {
      exerciseObject.img = exerciseImagesArray[index];
    }
    exerciseArray.push(exerciseObject);
  });
  return exerciseArray;
};

export default createExerciseArray;

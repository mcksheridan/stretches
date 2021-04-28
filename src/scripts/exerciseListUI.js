const instructions = document.querySelector('.stretch-timer__instructions');
const routine = document.querySelector('.stretch-timer__routine');

instructions.innerHTML = `
<button type="button" class="instructions__button">View Exercise List</button>
`;
const instructionsButton = document.querySelector('.instructions__button');

routine.style.display = 'none';

instructionsButton.addEventListener('click', () => {
  if (routine.style.display === 'none') {
    instructionsButton.textContent = 'Hide Exercise List';
    routine.style.display = 'block';
    return;
  }
  if (routine.style.display === 'block') {
    instructionsButton.textContent = 'View Exercise List';
    routine.style.display = 'none';
  }
});

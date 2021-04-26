const exercises = [
    {'exercise': 'Recline Knee To Chest (Left)',
    'image': 'stretches/recline-knee-to-chest.jpg'},
    {'exercise': 'Recline Knee To Chest (Right)',
    'image': ''},
    {'exercise': '90-90 (Left)',
    'image': 'stretches/90-90.jpg'},
    {'exercise': '90-90 (Right)',
    'image': ''},
    {'exercise': 'Standing Pigeon (Left)',
    'image': 'stretches/standing-pigeon.jpg'},
    {'exercise': 'Standing Pigeon (Right)',
    'image': ''},
    {'exercise': 'Reclined Pigeon (Left)',
    'image': 'stretches/reclined-pigeon.jpg'},
    {'exercise': 'Reclined Pigeon (Right)',
    'image': ''},
    {'exercise': 'Modified Pigeon (Left)',
    'image': 'stretches/modified-pigeon.jpg'},
    {'exercise': 'Modified Pigeon (Right)',
    'image': ''},
    {'exercise': 'Half Lord of the Fishes (Left)',
    'image': 'stretches/half-lord-of-the-fishes.jpg'},
    {'exercise': 'Half Lord of the Fishes (Right)',
    'image': ''},
    {'exercise': 'Lizard Pose (Left)',
    'image': 'stretches/lizard-pose.jpg'},
    {'exercise': 'Lizard Pose (Right)',
    'image': ''},
    {'exercise': 'Cow-Face Pose (Left)',
    'image': 'stretches/cow-face-pose.jpg'},
    {'exercise': 'Cow-Face Pose (Right)',
    'image': ''},
    {'exercise': 'Standing Straddle (Left)',
    'image': 'stretches/standing-straddle.jpg'},
    {'exercise': 'Standing Straddle (Right)',
    'image': ''},
    {'exercise': 'Tree Pose (Left)',
    'image': 'stretches/tree-pose.jpg'},
    {'exercise': 'Tree Pose (Right)',
    'image': ''},
    {'exercise': 'Rotated Low Lunge (Left)',
    'image': 'stretches/rotated-low-lunge.jpg'},
    {'exercise': 'Rotated Low Lunge (Right)',
    'image': ''}
]

// Stretches that use the same image as another stretch
for (let i = 1; i < exercises.length; i = i + 2) {
    exercises[i]['image'] = exercises[i - 1]['image']
};

console.log(exercises.length);
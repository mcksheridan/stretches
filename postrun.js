const exercises = [
    {'exercise': 'Hamstring Stretch (Left)',
    'image': 'stretches/hamstring-stretch.jpg'},
    {'exercise': 'Hamstring Stretch (Right)',
    'image': ''},
    {'exercise': 'Calf Stretch (Left)',
    'image': 'stretches/calf-stretch.jpg'},
    {'exercise': 'Calf Stretch (Right)',
    'image': ''},
    {'exercise': 'Glute and Piriformis Stretch (Left)',
    'image': 'stretches/glute-and-piriformis-stretch.jpg'},
    {'exercise': 'Glute and Piriformis Stretch (Right)',
    'image': ''},
    {'exercise': 'Chest Stretch',
    'image': 'stretches/chest-stretch-2.jpg'},
    {'exercise': 'Quad Stretch (Left)',
    'image': 'stretches/quad-stretch.jpg'},
    {'exercise': 'Quad Stretch (Right)',
    'image': ''},
]

// Stretches that use the same image as another stretch
exercises[1]['image'] = exercises[0]['image'];
exercises[3]['image'] = exercises[2]['image'];
exercises[5]['image'] = exercises[4]['image'];
exercises[8]['image'] = exercises[7]['image'];
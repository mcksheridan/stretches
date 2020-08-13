const exercises = [
    {'exercise': 'Crossover Hamstring Stretch (Left)',
    'image': 'stretches/upper-trapezius-stretch.jpg'},
    {'exercise': 'Crossover Hamstring Stretch (Right)',
    'image': ''},
    {'exercise': 'Pretzel Stretch (Left)',
    'image': 'stretches/pretzel-stretch.jpg'},
    {'exercise': 'Pretzel Stretch (Right)',
    'image': ''},
    {'exercise': 'Lunging Psoas Stretch (Left)',
    'image': 'stretches/lunging-psoas-stretch.jpg'},
    {'exercise': 'Lunging Psoas Stretch (Right)',
    'image': ''},
    {'exercise': 'Heel Drops (Left)',
    'image': 'stretches/heel-drops.jpg'},
    {'exercise': 'Heel Drops (Right)',
    'image': ''},
    {'exercise': 'Figure Four Stretch (Left)',
    'image': 'stretches/figure-four-stretch.jpg'},
    {'exercise': 'Figure Four Stretch (Right)',
    'image': ''},
    {'exercise': 'Standing Quad Stretch (Left)',
    'image': 'stretches/standing-quad-stretch.jpg'},
    {'exercise': 'Standing Quad Stretch (Right)',
    'image': ''},
    {'exercise': 'Downward Facing Dog',
    'image': 'stretches/downward-facing-dog.jpg'},
    {'exercise': 'Kneeling Hip Adductor Stretch (Left)',
    'image': 'stretches/kneeling-hip-adductor-stretch.jpg'},
    {'exercise': 'Kneeling Hip Adductor Stretch (Right)',
    'image': ''},
    {'exercise': 'Straddle',
    'image': 'stretches/straddle.jpg'},
    {'exercise': 'Double Pigeon Pose (Left)',
    'image': 'stretches/double-pigeon-pose.jpg'},
    {'exercise': 'Double Pigeon Pose (Right)',
    'image': 'stretches/double-pigeon-pose.jpg'}
]

// Stretches that use the same image as another stretch
exercises[1]['image'] = exercises[0]['image'];
exercises[3]['image'] = exercises[2]['image'];
exercises[5]['image'] = exercises[4]['image'];
exercises[7]['image'] = exercises[6]['image'];
exercises[9]['image'] = exercises[8]['image'];
exercises[11]['image'] = exercises[10]['image'];
exercises[14]['image'] = exercises[13]['image'];
exercises[17]['image'] = exercises[16]['image'];
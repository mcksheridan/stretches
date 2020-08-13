const exercises = [
    {'exercise': 'Upper Trapezius Stretch (Left)',
    'image': 'stretches/upper-trapezius-stretch.jpg'},
    {'exercise': 'Upper Trapezius Stretch (Right)',
    'image': ''},
    {'exercise': 'Overhead Triceps and Shoulder Stretch (Left)',
    'image': 'stretches/overhead-triceps-and-shoulder-stretch.jpg'},
    {'exercise': 'Overhead Triceps and Shoulder Stretch (Right)',
    'image': ''},
    {'exercise': 'Cross-Body Shoulder Stretch (Left)',
    'image': 'stretches/cross-body-shoulder-stretch.jpg'},
    {'exercise': 'Cross-Body Shoulder Stretch (Right)',
    'image': ''},
    {'exercise': 'Biceps Stretch',
    'image': 'stretches/biceps-stretch.jpg'},
    {'exercise': 'Reclined Spinal Twist (Left)',
    'image': 'stretches/reclined-spinal-twist.jpg'},
    {'exercise': 'Reclined Spinal Twist (Right)',
    'image': ''},
    {'exercise': 'Chest Stretch',
    'image': 'stretches/chest-stretch.jpg'},
    {'exercise': 'Lying Pectoral Stretch (Left)',
    'image': 'stretches/lying-pectoral-stretch.jpg'},
    {'exercise': 'Lying Pectoral Stretch (Right)',
    'image': ''},
    {'exercise': 'Wrist Extension Stretch (Left)',
    'image': 'stretches/wrist-extension-stretch.jpg'},
    {'exercise': 'Wrist Extension Stretch (Right)',
    'image': ''},
    {'exercise': 'Wrist Flexion Stretch (Left)',
    'image': 'stretches/wrist-flexion-stretch.jpg'},
    {'exercise': 'Wrist Flexion Stretch (Right)',
    'image': ''},
    {'exercise': 'Child\s Pose',
    'image': 'stretches/childs-pose.jpg'}
]

// Stretches that use the same image as another stretch
exercises[1]['image'] = exercises[0]['image'];
exercises[3]['image'] = exercises[2]['image'];
exercises[5]['image'] = exercises[4]['image'];
exercises[8]['image'] = exercises[7]['image'];
exercises[11]['image'] = exercises[10]['image'];
exercises[13]['image'] = exercises[12]['image'];
exercises[15]['image'] = exercises[14]['image'];
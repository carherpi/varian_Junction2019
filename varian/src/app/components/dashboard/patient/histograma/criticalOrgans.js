const CriticalOrgans = [
    {
        patient: 'Abdomen',
        organs: [
            {ID: 'PTV_50.4', MaxDose: null, MeanDose: 32,
            V: [{x:0,y:100},{x:40,y:100},{x:47.4,y:99},{x:50.4,y:95},{x:70,y:95},{x:70,y:0}]},
            {ID: 'PTV_45', MaxDose: null, MeanDose: 32,
            V: [{x:0,y:100},{x:35,y:100},{x:42.4,y:99},{x:45,y:95},{x:70,y:95},{x:70,y:0}]},
            {ID: 'Bowel', MaxDose: 50, MeanDose: 32,
            V: [{x:0,y:100},{x:45,y:100},{x:45,y:36},{x:70,y:36},{x:70,y:0}]},
            {ID: 'Femur_L', MaxDose: 44, MeanDose: null,
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:40},{x:45,y:25},{x:70,y:25},{x:70,y:0}]},
            {ID: 'Femur_R', MaxDose: 44, MeanDose: null, 
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:40},{x:45,y:25},{x:70,y:25},{x:70,y:0}]},
            {ID: 'Rectum', MaxDose: null, MeanDose: null, 
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:35},{x:65,y:17},{x:75,y:10}]},
            {ID: 'Bladder', MaxDose: 50, MeanDose: null, 
            V: [{x:0,y:100},{x:35,y:100},{x:35,y:5},{x:40,y:2},{x:70,y:2},{x:70,y:0}]},
            {ID: 'Body', MaxDose: null, MeanDose: null, V: []},
        ]
    },
    {
        patient: 'Head_Neck',
        organs: [
            {ID: 'PTV56', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:40,y:100},{x:53,y:99},{x:56,y:95},{x:75,y:0}]},
            {ID: 'PTV63', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:50,y:100},{x:60,y:99},{x:63,y:95},{x:75,y:0}]},
            {ID: 'PTV70', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:60,y:100},{x:67,y:99},{x:70,y:95},{x:75,y:0}]},
            {ID: 'BrainStem', MaxDose: 54, MeanDose: null,
            V: [{x:0,y:100},{x:52,y:100},{x:52,y:50},{x:54,y:0}]},
            {ID: 'Spinal Cord', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:48,y:100},{x:48,y:50},{x:70,y:50},{x:70,y:0}]},
            {ID: 'Mandible', MaxDose: 70, MeanDose: null,
            V: [{x:0,y:100},{x:70,y:100},{x:70,y:10},{x:70,y:0}]},
            {ID: 'Lips', MaxDose: 40, MeanDose: 20, 
            V: [{x:0,y:100},{x:30,y:100},{x:30,y:20},{x:70,y:20},{x:70,y:0}]},
            {ID: 'Parotid Right', MaxDose: null, MeanDose: 24, V: []},
            {ID: 'Larynx', MaxDose: null, MeanDose: 45, V: []},
            {ID: 'Body', MaxDose: null, MeanDose: null, V: []},
        ]
    },
    {
        patient: 'Lung',
        organs: [
            {ID: 'PTV_63', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:50,y:100},{x:60,y:99},{x:63,y:95},{x:70,y:95},{x:70,y:0}]},
            {ID: 'Heart', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:50},{x:50,y:2},{x:70,y:2},{x:70,y:0}]},
            {ID: 'Lung right', MaxDose: null, MeanDose: null, 
            V: [{x:0,y:100},{x:5,y:100},{x:5,y:50},{x:10,y:40},{x:20,y:25},{x:30,y:20},{x:70,y:20},{x:70,y:0}]},
            {ID: 'Lung left', MaxDose: null, MeanDose: null, 
            V: [{x:0,y:100},{x:5,y:100},{x:5,y:50},{x:10,y:45},{x:20,y:25},{x:30,y:20},{x:70,y:20},{x:70,y:0}]},
            {ID: 'Lung-GTV', MaxDose: null, MeanDose: 16, 
            V: [{x:0,y:100},{x:10,y:100},{x:10,y:40},{x:20,y:24},{x:70,y:24},{x:70,y:0}]},
            {ID: 'Spinal cord', MaxDose: 45, MeanDose: null, V: []},
            {ID: 'Body', MaxDose: null, MeanDose: null, V: []},
        ]
    },
    {
        patient: 'Prostate',
        organs: [
            {ID: 'PTV_56', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:40,y:100},{x:53,y:99},{x:56,y:95},{x:70,y:95},{x:70,y:0}]},
            {ID: 'PTV_68', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:50,y:100},{x:65,y:99},{x:68,y:95},{x:70,y:95},{x:70,y:0}]},
            {ID: 'Rectum', MaxDose: null, MeanDose: null,
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:35},{x:65,y:17},{x:75,y:10}]},
            // V: [{x:0,y:100},{x:50,y:100},{x:50,y:50},{x:60,y:35},{x:65,y:25},{x:70,y:20},{x:75,y:15}]},
            {ID: 'Bladder', MaxDose: null, MeanDose: null, 
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:50},{x:50,y:50},{x:65,y:25},{x:70,y:25},{x:70,y:0}]},
            {ID: 'prostate_bed', MaxDose: null, MeanDose: null, 
            V: [{x:0,y:100},{x:40,y:100},{x:40,y:0}]},
            {ID: 'Body', MaxDose: null, MeanDose: null, V: []},
        ]
    }
]

export default CriticalOrgans;
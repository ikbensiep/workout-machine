const workouts = [
    {
        slug: 'new',
        level: 1,
        type : "",
        collection : "",
        name : "New workout",
        desc : "",
        coach : "",
        reps: []
    },
    {
        slug: 'simple-5-min-workout',
        level: 1,
        type : "home workout",
        collection : "default",
        name : "Simple 5-minute workout",
        desc : "Let's at least do 5 minutes of exercise today",
        coach : "This is easy.",
        reps: [
            {   name : "march in place",
                work: 45,
                rest: 15
            },
            {   name : "sit ups",
                work: 45,
                rest: 15
            },
            {   name : "push ups",
                work: 45,
                rest: 15
            },
            {   name : "squats",
                work: 45,
                rest: 15
            },
            {   name : "plank",
                work: 45,
                rest: 15
            }
        ]
    },
    {
        slug: 'everyday-20-min-workout',
        level: 2,
        type : "home workout",
        collection : "default",
        name : "Everyday 20-minute dumbell workout",
        desc : "A simple daily dumbell workout for every day. Start with 1kg and move up to the next size when the workout starts to feel too easy. And of course, we don't forget the legs.",
        coach : "Let's rip. 💪",
        reps: [
            {
                name : "10 squats",
                desc : "hold weights to chest, with a straight back, squat down",
                work: 45,
                rest: 15
            },
            {
                name : "10 bicep curls",
                desc : "curl arms up halfway, then stretch arms above head",
                work:  45,
                rest: 15
            },
            {
                name : "2x10 squats",
                desc : "Holding the dumbells alternate left and right",
                work: 45,
                rest: 15
            },
            {
                name : "10 arm stretches",
                desc : "bend over forwards, curl arms down, stretch arms horizontally",
                work:  45,
                rest: 10
            },
            {
                name : "10 folds",
                desc : "Standing up straight while holding dumbells, bend over holding dumbells right above toes, hold for ~ 1-2 seconds. Keep legs straight or bend to your abilities.",
                work: 60,
                rest: 10
            },
            {
                name : "20 curls",
                desc : "10 diagonal whatever. Holding dumbells up to shoulders, starting with one arm, stretch down arm, and pull up 10 repeating times. Switch to other arm and repeat.",
                work: 120,
                rest: 30
            }
        ]
    },
    {
        slug: 'c25k-week1-r1',
        level:1,
        type : "running",
        collection : "C25K",
        name : "Week 1, training 1",
        desc : "After warming up with a 5 minute brisk walk, do a total of 20 minutes of workout alternating 60s of running and 90s walking.",
        coach : "👊 Day zero. Bring it!",
        warmup: [
            {
                name : "warmup",
                work: 300,
                rest: 10
            
            }
        ],

        reps : [
            {
                name : "jog 60, walk 90",
                work: 60,
                rest: 90
            }
        ],

        set : [1,8],
        fixme : "// one warmup (300s = 5 min), eight reps (8 times 150s = 1200s or 20 min)"
    },
    {
        slug: 'c25k-week5-r3',
        level:5,
        type : "running",
        collection : "C25K",
        name : "Week 5, training 3",
        desc : "After a 5 minute brisk warmup walk, do a total of 20 minutes straight running.",
        coach : "👊 You got this.",
        warmup: [{
            name : "Brisk 5-minute walk",
            work: 300,
            rest: 10
        }],

        reps : [
            {
                name : "jog 20 minutes straight (or 3.2km)",
                work: 1200,
                rest: 60
            }
        ],

        set : [1,1],
        fixme : "// one warmup (300s = 5 min), one rep (1200s = 20 min)"

    }
];

export default workouts;